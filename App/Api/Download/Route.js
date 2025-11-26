export async function POST(req) {
  try {
    const { url } = await req.json();

    const api = `https://api.video-dl.to/facebook?url=${encodeURIComponent(url)}`;
    const res = await fetch(api);
    const data = await res.json();

    return Response.json(data);
  } catch (e) {
    return Response.json({ error: "Server error", detail: e.message });
  }
}
