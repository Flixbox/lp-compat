import { APPS_WORKER_BASE_URL, type App } from "@lp-compat/shared";
import appsJson from "./apps.json";

const apps: App[] = appsJson;

async function createApp(app: App) {
  delete (app as any)._id; // old Mongo ID
  const res = await fetch(`${APPS_WORKER_BASE_URL}/create`, {
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
    return;
  }

  const data = await res.json();
  console.log(`✅ Created app ${app.appId} → appId: ${data.appId}`);
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

  // Iterate through local apps
  for (const app of apps) {
    if (existingIds.has(app.appId)) {
      console.log(`⚠️ Skipping ${app.appId}, already exists`);
      continue;
    }

    await createApp(app);
    // small delay to avoid hammering the Worker
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

main().catch((err) => {
  console.error("Error seeding apps:", err);
});
