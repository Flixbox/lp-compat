import type {
  ExecutionContext,
  R2Bucket,
  ScheduledEvent,
} from "@cloudflare/workers-types";
import type { App } from "@lp-compat/shared";
import { getPlaystoreData, type PlayStoreData } from "@/getPlaystoreData";
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
  if (
    origin.startsWith("http://localhost") ||
    origin.startsWith("http://127.0.0.1")
  )
    return true;
  if (/^https:\/\/[a-zA-Z0-9-]+\.github\.io/.test(origin)) return true;
  return false;
}

async function enrichWithPlayData(body: any, fallbackAppId?: string) {
  const appId = body?.appId || fallbackAppId;
  if (!appId) return body;
  try {
    const play = await getPlaystoreData(appId);
    if (!play) return body;

    const keys: (keyof PlayStoreData)[] = [
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
      const hasValue = body[key] != null && body[key] !== "";
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
  /**
   * Main worker that handles requests - 10ms execution limit
   */
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
        return new Response(file.body, {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders(origin),
          },
        });
      }

      // ENQUEUE new or updated app
      if (url.pathname === "/enqueue" && req.method === "POST") {
        const body = (await req.json()) as App;
        const anyBody = body as any;

        if (!anyBody.appId) {
          return new Response("Missing appId", {
            ...commonHeaders,
            status: 400,
          });
        }

        await enrichWithPlayData(anyBody);

        // Always enqueue into apps_queue/
        await env.APPS_BUCKET.put(
          `apps_queue/${anyBody.appId}.json`,
          JSON.stringify(anyBody, null, 2),
          {
            httpMetadata: { contentType: "application/json" },
          },
        );

        if (!noWebhook) {
          await sendDiscordUpdate(body, "queued", env.DISCORD_WEBHOOK);
        }

        return Response.json(
          { status: "queued", appId: anyBody.appId },
          commonHeaders,
        );
      }

      return new Response("Not found", { ...commonHeaders, status: 404 });
    } catch (err: any) {
      return new Response(err?.message ?? String(err), {
        ...commonHeaders,
        status: 500,
      });
    }
  },
  /**
   * Cronjob that processes the queue - Higher execution timeframe
   */
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const file = await env.APPS_BUCKET.get("apps.json");
    const apps: App[] = file ? JSON.parse(await file.text()) : [];

    const appMap = new Map<string, App>();
    for (const app of apps) {
      if (app.appId) appMap.set(app.appId, app);
    }

    const list = await env.APPS_BUCKET.list({ prefix: "apps_queue/" });

    for (const obj of list.objects) {
      const file = await env.APPS_BUCKET.get(obj.key);
      if (!file) continue;

      try {
        const app = JSON.parse(await file.text());
        if (!app.appId) continue;

        appMap.set(app.appId, app);
        await env.APPS_BUCKET.delete(obj.key);
        console.log(`Processed and removed ${obj.key}`);
      } catch (e) {
        console.error("Bad JSON in", obj.key, e);
      }
    }

    const mergedApps = Array.from(appMap.values());
    await env.APPS_BUCKET.put(
      "apps.json",
      JSON.stringify(mergedApps, null, 2),
      {
        httpMetadata: { contentType: "application/json" },
      },
    );

    console.log(`Rebuilt apps.json with ${mergedApps.length} entries`);
  },
};
