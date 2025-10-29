import sendDiscordUpdate from "../discord/sendDiscordUpdate";
import { App } from "../types";
import getPlaystoreData from "./getPlaystoreData";

export interface Env {
  GITHUB_REPO: string;
  GITHUB_TOKEN: string;
  DISCORD_WEBHOOK?: string;
}

const filePath = "static/lucky-patcher-app-compatibility.json";

function encodeBase64(input: string): string {
  if (typeof btoa === "function") return btoa(input);
  return Buffer.from(input, "utf-8").toString("base64");
}

// Build standard headers for GitHub REST API requests
function githubHeaders(env: Env, contentType?: string) {
  const headers: Record<string, string> = {
    Authorization: `token ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "lp-compat-worker/1.0",
  };
  if (contentType) headers["Content-Type"] = contentType;
  return headers;
}

async function fetchFile(env: Env): Promise<{ content: App[]; sha: string }> {
  // Download raw JSON directly from raw.githubusercontent (hardcoded branch 'main')
  const rawUrl = `https://raw.githubusercontent.com/${env.GITHUB_REPO}/main/${filePath}`;
  const apiUrl = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${filePath}`;

  // Fetch raw file contents
  const rawRes = await fetch(rawUrl);
  if (!rawRes.ok && rawRes.status !== 404) {
    const text = await rawRes.text();
    throw new Error(`Failed to fetch raw file from GitHub: ${rawRes.status} ${text}`);
  }
  const raw = rawRes.ok ? await rawRes.text() : "";

  // Fetch metadata to obtain the latest sha required for updates
  const metaRes = await fetch(apiUrl, { headers: githubHeaders(env) });
  if (!metaRes.ok) {
    const text = await metaRes.text();
    throw new Error(`Failed to fetch file metadata from GitHub: ${metaRes.status} ${text}`);
  }
  const metaJson = await metaRes.json();
  const sha = metaJson.sha;

  // If the file is empty or missing, return an empty array
  if (!raw || !raw.trim()) {
    return { content: [], sha };
  }

  try {
    const content = JSON.parse(raw) as App[];
    return { content, sha };
  } catch (e) {
    const preview = String(raw).slice(0, 200);
    throw new Error(`Failed to parse JSON from GitHub raw content: ${(e as Error).message}. Raw preview: ${preview}`);
  }
}

async function updateFile(env: Env, newContent: App[], sha: string, message: string) {
  const url = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${filePath}`;
  const body = {
    message,
    content: encodeBase64(JSON.stringify(newContent, null, 2)),
    sha,
  };
  const res = await fetch(url, {
    method: "PUT",
    headers: githubHeaders(env, "application/json"),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update file on GitHub: ${res.status} ${text}`);
  }
  return res.json();
}

async function enrichWithPlayData(body: any, fallbackAppId?: string) {
  const appId = body?.appId || fallbackAppId;
  if (!appId) return body;
  try {
    const play = await getPlaystoreData(appId);
    if (!play) return body;

    const keys = [
      "title",
      "summary",
      "installs",
      "minInstalls",
      "price",
      "free",
      "score",
      "scoreText",
      "priceText",
      "androidVersion",
      "androidVersionText",
      "developer",
      "developerId",
      "genre",
      "genreId",
      "icon",
      "headerImage",
      "screenshots",
      "adSupported",
      "updated",
      "version",
      "recentChanges",
      "url",
      "offersIAP",
      "IAPRange",
      "appId",
    ];

    for (const key of keys) {
      const hasValue = body[key] !== undefined && body[key] !== null && body[key] !== "";
      if (!hasValue && play[key] !== undefined) {
        body[key] = play[key];
      }
    }
  } catch (e) {
    console.error("Error fetching playstore data for", appId, e);
  }
  return body;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(req.url);
      const { content, sha } = await fetchFile(env);

      // Read all entries
      if (url.pathname === "/read" && req.method === "GET") {
        return Response.json(content);
      }

      // Create a new entry
      if (url.pathname === "/create" && req.method === "POST") {
        const body = (await req.json()) as App;
        // Ensure an id exists. If not, generate one.
        const anyBody = body as any;
        if (!anyBody.id) {
          anyBody.id = Date.now().toString();
        }

        // Enrich missing fields from Play Store if possible
        await enrichWithPlayData(anyBody);

        const newContent = [...content, anyBody];
        await updateFile(env, newContent, sha, "Add new entry");

        await sendDiscordUpdate(body, "added", env.DISCORD_WEBHOOK);

        return Response.json({ status: "created", id: anyBody.id });
      }

      // Update existing entry
      if (url.pathname === "/update" && req.method === "PUT") {
        const body = (await req.json()) as App;
        const anyBody = body as any;
        if (!anyBody.id) return new Response("Missing id", { status: 400 });
        const index = content.findIndex((x) => (x as any).id === anyBody.id);
        if (index === -1) return new Response("Not found", { status: 404 });

        // Merge with existing entry so we don't lose fields not present in the update payload
        const existing = content[index] as any;
        const merged = { ...existing, ...anyBody };

        // Enrich missing fields from Play Store using either provided appId or existing appId
        await enrichWithPlayData(merged, existing?.appId);

        content[index] = merged;
        await updateFile(env, content, sha, "Update entry");

        await sendDiscordUpdate(body, "modified", env.DISCORD_WEBHOOK);

        return Response.json({ status: "updated" });
      }

      return new Response("Not found", { status: 404 });
    } catch (err: any) {
      return new Response(err?.message ?? String(err), { status: 500 });
    }
  },
};
