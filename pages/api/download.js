export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const api = `https://snapsave.app/download?url=${encodeURIComponent(url)}`;

    const result = await fetch(api).then((r) => r.json());

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
