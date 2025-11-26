export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const apiUrl = "https://europa-dl-api.vercel.app/facebook";

    const result = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);

    const text = await result.text();

    // kalau API bukan JSON → cek manual
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch (e) {
      return res.status(500).json({
        error: "Server returned non-JSON",
        raw: text.slice(0, 300)
      });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
