import { APPS_WORKER_BASE_URL, type App } from "@lp-compat/shared";
import appsJson from "./apps.json";

const apps: App[] = appsJson;

async function createApp(app: App) {
  delete (app as any)._id; // old Mongo ID
  const res = await fetch(`${APPS_WORKER_BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": "http://localhost:3000"
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
  for (const app of apps) {
    await createApp(app);
    // small delay to avoid hammering the Worker
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

main().catch((err) => {
  console.error("Error seeding apps:", err);
});
