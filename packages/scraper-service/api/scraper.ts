import gplay from "google-play-scraper";
import { Hono } from "hono";
import { cors } from "hono/cors";

const isGPlayMethod = (method: string): method is keyof typeof gplay =>
  method in gplay;

const app = new Hono();

const allowedOrigins = ["http://localhost:3001", "https://flixbox.github.io"];

app.use(
  "*",
  cors({
    origin: allowedOrigins,
    allowHeaders: ["Content-Type"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    maxAge: 600,
  }),
);

app.post("/:gPlayMethod", async (c) => {
  try {
    const gPlayMethod = c.req.param("gPlayMethod");
    const params = await c.req.json();

    if (!isGPlayMethod(gPlayMethod)) {
      c.status(400);
      return c.json({ error: `Method '${gPlayMethod}' not supported` });
    }

    const target = gplay[gPlayMethod];

    if (typeof target === "function") {
      // Safe to call
      const result = await target(params);
      return c.json(result);
    } else {
      // Not callable: return its value stringified
      return c.json({ value: JSON.stringify(target) });
    }
  } catch (error) {
    c.status(500);
    return c.json({ error: (error as Error).message });
  }
});

app.get("/", (c) => {
  return c.json({
    message: "Google Play Scraper",
    documentation: "https://github.com/facundoolano/google-play-scraper",
  });
});

export default app;
