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
    "Access-Control-Allow-Headers": "Content-Type, Authorization, no_webhook",
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
    const noWebhook = req.headers.get("no_webhook") === "true";
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

      // READ all apps from single apps.json
      if (url.pathname === "/read" && req.method === "GET") {
        const file = await env.APPS_BUCKET.get("apps.json");
        if (!file) {
          return Response.json([], commonHeaders);
        }
        const apps = JSON.parse(await file.text()) as App[];
        return Response.json(apps, commonHeaders);
      }

      // CREATE new app
      if (url.pathname === "/create" && req.method === "POST") {
        const body = (await req.json()) as App;
        const anyBody = body as any;

        if (!anyBody.appId) {
          return new Response("Missing appId", { ...commonHeaders, status: 400 });
        }

        const file = await env.APPS_BUCKET.get("apps.json");
        const apps: App[] = file ? JSON.parse(await file.text()) : [];

        if (apps.find(a => (a as any).appId === anyBody.appId)) {
          return new Response("Duplicate appId", { ...commonHeaders, status: 409 });
        }

        await enrichWithPlayData(anyBody);

        apps.push(anyBody);

        await env.APPS_BUCKET.put("apps.json", JSON.stringify(apps, null, 2), {
          httpMetadata: { contentType: "application/json" },
        });

        if (!noWebhook) {
          await sendDiscordUpdate(body, "added", env.DISCORD_WEBHOOK);
        }

        return Response.json({ status: "created", appId: anyBody.appId }, commonHeaders);
      }

      // UPDATE existing app
      if (url.pathname === "/update" && req.method === "PUT") {
        const body = (await req.json()) as App;
        const anyBody = body as any;

        if (!anyBody.appId) {
          return new Response("Missing appId", { ...commonHeaders, status: 400 });
        }

        const file = await env.APPS_BUCKET.get("apps.json");
        if (!file) {
          return new Response("Not found", { ...commonHeaders, status: 404 });
        }

        const apps: any[] = JSON.parse(await file.text());
        const idx = apps.findIndex(a => a.appId === anyBody.appId);
        if (idx === -1) {
          return new Response("Not found", { ...commonHeaders, status: 404 });
        }

        const merged = { ...apps[idx], ...anyBody };
        await enrichWithPlayData(merged, apps[idx]?.appId);
        apps[idx] = merged;

        await env.APPS_BUCKET.put("apps.json", JSON.stringify(apps, null, 2), {
          httpMetadata: { contentType: "application/json" },
        });

        if (!noWebhook) {
          await sendDiscordUpdate(body, "modified", env.DISCORD_WEBHOOK);
        }

        return Response.json({ status: "updated", appId: anyBody.appId }, commonHeaders);
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
