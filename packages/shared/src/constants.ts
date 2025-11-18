/**
 * Scraper base URL (hosted service). Method endpoints are e.g. /app, /search
 */
const SCRAPER_BASE_URL = "https://lp-compat.vercel.app";

/**
 * All apps-related requests should go via the worker URL below.
 */
const APPS_WORKER_BASE_URL =
  "https://lp-compat-backend.alone-king-poking.workers.dev";

const DISCORD_CLIENT_ID = "1021002998069067777";

const PROD_REDIRECT_URI = "https://flixbox.github.io/lp-compat/";
const DEV_REDIRECT_URI = "http://localhost:3001/lp-compat/";
const DISCORD_OAUTH_REDIRECT_URI =
  process.env.NODE_ENV === "development" ? DEV_REDIRECT_URI : PROD_REDIRECT_URI;

export {
  SCRAPER_BASE_URL,
  APPS_WORKER_BASE_URL,
  DISCORD_CLIENT_ID,
  DISCORD_OAUTH_REDIRECT_URI,
};
