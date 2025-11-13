/**
 * Scraper base URL (hosted service). Method endpoints are e.g. /app, /search
 */
const SCRAPER_BASE_URL = "https://lp-compat.vercel.app";

/**
 * All apps-related requests should go via the worker URL below.
 */
const APPS_WORKER_BASE_URL =
  "https://lp-compat-backend.alone-king-poking.workers.dev";

export { SCRAPER_BASE_URL, APPS_WORKER_BASE_URL };
