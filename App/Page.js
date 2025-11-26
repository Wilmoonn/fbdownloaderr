"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const download = async () => {
    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Facebook Downloader</h1>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste Facebook link"
        style={{ padding: 10, width: 300 }}
      />

      <button onClick={download} style={{ padding: 10, marginLeft: 10 }}>
        Download
      </button>

      {result && <pre style={{ marginTop: 20 }}>{JSON.stringify(result, null, 2)}</pre>}
    </main>
  );
}
