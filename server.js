import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { decodeVIN } from "./services/vpicService.js";
import cache from "./utils/cache.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function isValidVIN(vin) {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
}

app.get("/api/decode/:vin", async (req, res) => {
  const vin = req.params.vin.toUpperCase();

  if (!isValidVIN(vin)) {
    return res.status(400).json({ error: "Invalid VIN format" });
  }

  const cached = cache.get(vin);
  if (cached) {
    return res.json({ source: "cache", data: cached });
  }

  try {
    const decoded = await decodeVIN(vin);
    cache.set(vin, decoded);
    res.json({ source: "live", data: decoded });
  } catch (err) {
    res.status(500).json({ error: "Failed to decode VIN" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
