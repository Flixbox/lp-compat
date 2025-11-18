const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Scraper base URL (hosted service). Method endpoints are e.g. /app, /search
 */

const PROD_SCRAPER_BASE_URL = "https://lp-compat.vercel.app";
const DEV_SCRAPER_BASE_URL =
  "https://lp-compat-git-bun-rework-flixboxs-projects.vercel.app";

const SCRAPER_BASE_URL = isDevelopment
  ? DEV_SCRAPER_BASE_URL
  : PROD_SCRAPER_BASE_URL;

/**
 * All apps-related requests should go via the worker URL below.
 */

const PROD_APPS_WORKER_BASE_URL =
  "https://lp-compat-backend.alone-king-poking.workers.dev";
const DEV_APPS_WORKER_BASE_URL =
  "https://bun-rework-lp-compat-backend.alone-king-poking.workers.dev";

const APPS_WORKER_BASE_URL = isDevelopment
  ? DEV_APPS_WORKER_BASE_URL
  : PROD_APPS_WORKER_BASE_URL;

const DISCORD_CLIENT_ID = "1021002998069067777";

const PROD_REDIRECT_URI = "https://flixbox.github.io/lp-compat/";
const DEV_REDIRECT_URI = "http://localhost:3001/lp-compat/";
const DISCORD_OAUTH_REDIRECT_URI = isDevelopment
  ? DEV_REDIRECT_URI
  : PROD_REDIRECT_URI;

export {
  SCRAPER_BASE_URL,
  APPS_WORKER_BASE_URL,
  DISCORD_CLIENT_ID,
  DISCORD_OAUTH_REDIRECT_URI,
};
