import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function download() {
    if (!url) return;

    setLoading(true);
    setData(null);

    const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
    const json = await res.json();

    setData(json);
    setLoading(false);
  }

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h1>Facebook Downloader</h1>
      <input
        style={{
          width: "300px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
        placeholder="Paste Facebook video URL…"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={download}
        style={{
          marginLeft: "10px",
          padding: "10px 18px",
          cursor: "pointer",
          background: "black",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Download
      </button>

      {loading && <p>Processing…</p>}

      {data && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>

          {data?.download?.length > 0 && (
            <a
              href={data.download[0].url}
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "green",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Download Video
            </a>
          )}
        </div>
      )}
    </div>
  );
}
