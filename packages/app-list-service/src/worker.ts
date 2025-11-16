import type { R2Bucket } from "@cloudflare/workers-types";
import type { App } from "@lp-compat/shared";
import { getPlaystoreData } from "@/getPlaystoreData";
import { sendDiscordUpdate } from "@/sendDiscordUpdate";

export interface Env {
  DISCORD_WEBHOOK?: string;
  APPS_BUCKET: R2Bucket;
}

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) return true;
  if (/^https:\/\/[a-zA-Z0-9-]+\.github\.io/.test(origin)) return true;
  return false;
}

async function enrichWithPlayData(body: any, fallbackAppId?: string) {
  const appId = body?.appId || fallbackAppId;
  if (!appId) return body;
  try {
    const play = await getPlaystoreData(appId);
    if (!play) return body;

    const keys = [
      "title","summary","installs","minInstalls","price","free","score","scoreText","priceText",
      "androidVersion","androidVersionText","developer","developerId","genre","genreId","icon",
      "headerImage","screenshots","adSupported","updated","version","recentChanges","url",
      "offersIAP","IAPRange","appId",
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
    const origin = req.headers.get("Origin") || "";
    const commonHeaders = { headers: corsHeaders(origin) };

    if (req.method === "OPTIONS") {
      if (isAllowedOrigin(origin)) return new Response(null, commonHeaders);
      return new Response("Forbidden", { status: 403 });
    }

    if (!isAllowedOrigin(origin)) {
      return new Response("Forbidden", { status: 403 });
    }

    try {
      const url = new URL(req.url);

      // READ all apps
      if (url.pathname === "/read" && req.method === "GET") {
        const list = await env.APPS_BUCKET.list({ prefix: "apps/" });
        const apps: App[] = [];
        for (const obj of list.objects) {
          const file = await env.APPS_BUCKET.get(obj.key);
          if (file) {
            apps.push(JSON.parse(await file.text()) as App);
          }
        }
        return Response.json(apps, commonHeaders);
      }

      // CREATE new app
      if (url.pathname === "/create" && req.method === "POST") {
        const body = (await req.json()) as App;
        const anyBody = body as any;
        if (!anyBody.id) anyBody.id = Date.now().toString();

        await enrichWithPlayData(anyBody);

        await env.APPS_BUCKET.put(`apps/${anyBody.id}.json`, JSON.stringify(anyBody, null, 2), {
          httpMetadata: { contentType: "application/json" },
        });

        await sendDiscordUpdate(body, "added", env.DISCORD_WEBHOOK);

        return Response.json({ status: "created", id: anyBody.id }, commonHeaders);
      }

      // UPDATE existing app
      if (url.pathname === "/update" && req.method === "PUT") {
        const body = (await req.json()) as App;
        const anyBody = body as any;
        if (!anyBody.id)
          return new Response("Missing id", { ...commonHeaders, status: 400 });

        const obj = await env.APPS_BUCKET.get(`apps/${anyBody.id}.json`);
        if (!obj)
          return new Response("Not found", { ...commonHeaders, status: 404 });

        const existing = JSON.parse(await obj.text()) as any;
        const merged = { ...existing, ...anyBody };

        await enrichWithPlayData(merged, existing?.appId);

        await env.APPS_BUCKET.put(`apps/${anyBody.id}.json`, JSON.stringify(merged, null, 2), {
          httpMetadata: { contentType: "application/json" },
        });

        await sendDiscordUpdate(body, "modified", env.DISCORD_WEBHOOK);

        return Response.json({ status: "updated" }, commonHeaders);
      }

      return new Response("Not found", { ...commonHeaders, status: 404 });
    } catch (err: any) {
      return new Response(err?.message ?? String(err), {
        ...commonHeaders,
        status: 500,
      });
    }
  },
};
