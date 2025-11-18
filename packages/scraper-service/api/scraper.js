import cors from "cors";
import express from "express";
import gplay from "google-play-scraper";

const app = express();

const allowedOrigins = ["http://localhost:3001", "https://flixbox.github.io"];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

// ✅ Apply same CORS config everywhere
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight

app.use(express.json());

app.post("/:method", async (req, res) => {
  try {
    const method = req.params.method;
    const params = req.body;

    if (!gplay[method]) {
      return res
        .status(400)
        .json({ error: `Method '${method}' not supported` });
    }

    const result = await gplay[method](params);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Google Play Scraper",
    documentation: "https://github.com/facundoolano/google-play-scraper",
  });
});

// Export as handler for Vercel
export default (req, res) => app(req, res);
