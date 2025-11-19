import { APPS_WORKER_BASE_URL, type App } from "@lp-compat/shared";
import type { EnqueueResponse } from "@/worker";
import appsJson from "./apps.json"; // add this file manually when seeding

const apps: App[] = appsJson;

async function createApp(app: App): Promise<boolean> {
  delete (app as { _id?: string })._id; // old Mongo ID
  try {
    const res = await fetch(`${APPS_WORKER_BASE_URL}/enqueue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        no_webhook: "true",
      },
      body: JSON.stringify(app),
    });

    if (!res.ok) {
      console.error(
        `❌ Failed to create app ${app.appId}: ${res.status} ${await res.text()}`,
      );
      return false;
    }

    const data = (await res.json()) as EnqueueResponse;
    console.log(`✅ Created app ${app.appId} → appId: ${data.appId}`);
    return true;
  } catch (err) {
    console.error(`❌ Network/Fetch error for ${app.appId}:`, err);
    return false;
  }
}

async function main() {
  // Fetch existing apps once
  const res = await fetch(`${APPS_WORKER_BASE_URL}/read`, {
    method: "GET",
    headers: {
      Origin: "http://localhost:3000",
    },
  });

  if (!res.ok) {
    console.error(
      `❌ Failed to fetch existing apps: ${res.status} ${await res.text()}`,
    );
    return;
  }

  const existingApps = (await res.json()) as App[];
  const existingIds = new Set(existingApps.map((a) => a.appId));

  const delay = 1000; // normal delay between requests
  let backoff = 30_000; // start backoff at 30s

  for (const app of apps) {
    if (existingIds.has(app.appId) || !app.appId) {
      console.log(`⚠️ Skipping ${app.appId}, already exists`);
      continue;
    }

    const success = await createApp(app);
    if (success) {
      // reset backoff after success
      backoff = 30_000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    } else {
      // exponential backoff on error
      console.log(`⏳ Backing off for ${backoff / 1000}s before retrying...`);
      await new Promise((resolve) => setTimeout(resolve, backoff));
      backoff *= 2; // double backoff for next error
    }
  }
}

main().catch((err) => {
  console.error("Error seeding apps:", err);
});
