import express from 'express';
import gplay from 'google-play-scraper';

const app = express();
app.use(express.json());

app.post('/:method', async (req, res) => {
  try {
    const method = req.params.method;
    const params = req.body;

    if (!gplay[method]) {
      return res.status(400).json({ error: `Method '${method}' not supported` });
    }

    const result = await gplay[method](params);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Google Play Scraper',
    documentation: 'https://github.com/facundoolano/google-play-scraper'
  });
});

export default app;
