"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function HomePage() {
  const [attribute1, setAttribute1] = useState("");
  const [record, setRecord] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [sentimentResult, setSentimentResult] = useState<any>(null);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    const pk = `TEST#${uuidv4()}`; // Automatically generate a unique PK
    const sk = `RECORD#${new Date().toISOString()}`; // Use current timestamp for SK

    const response = await fetch("/api/createRecord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ PK: pk, SK: sk, Attribute1: attribute1 }),
    });

    if (response.ok) {
      setMessage("Record created successfully");
    } else {
      setMessage("Failed to create record");
    }
  };

  const handleRead = async (event: React.FormEvent) => {
    event.preventDefault();

    const pkPrefix = "TEST"; // Prefix for the PK
    const skPrefix = "RECORD"; // Prefix for the SK

    const url = `/api/readRecord?pkPrefix=${encodeURIComponent(
      pkPrefix
    )}&skPrefix=${encodeURIComponent(skPrefix)}`;
    console.log("URL:", url); // Debugging log to ensure correct URL

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setRecord(data);
      setMessage("Records retrieved successfully");
    } else {
      setMessage("Failed to retrieve records");
    }
  };

  const handleSentimentAnalysis = async () => {
    const pk = "TEST#24e7b557-c9ec-45e4-a52d-a9c56a07b8f9";
    const sk = "RECORD#2024-08-24T14:32:05.673Z";

    const url = `/api/sentimentAnalysis?PK=${encodeURIComponent(
      pk
    )}&SK=${encodeURIComponent(sk)}`;
    console.log("Sentiment Analysis URL:", url);

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSentimentResult(data);
      setMessage("Sentiment analysis completed successfully");
    } else {
      setMessage("Failed to perform sentiment analysis");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>DynamoDB Test Page</h1>

      <h2>Create Record</h2>
      <form onSubmit={handleCreate} style={{ marginBottom: "20px" }}>
        <div>
          <label>Attribute1:</label>
          <input
            type="text"
            value={attribute1}
            onChange={(e) => setAttribute1(e.target.value)}
          />
        </div>
        <button type="submit">Create Record</button>
      </form>

      <h2>Read Record</h2>
      <form onSubmit={handleRead} style={{ marginBottom: "20px" }}>
        <button type="submit">Read Most Recent Record</button>
      </form>

      <h2>Analyze Sentiment</h2>
      <button onClick={handleSentimentAnalysis}>Analyze Sentiment</button>

      {message && <p>{message}</p>}

      {record && (
        <div>
          <h3>Record Details:</h3>
          <pre>{JSON.stringify(record, null, 2)}</pre>
        </div>
      )}

      {sentimentResult && (
        <div>
          <h3>Sentiment Analysis Result:</h3>
          <p>Sentiment: {sentimentResult.sentiment}</p>
          <pre>
            Scores: {JSON.stringify(sentimentResult.sentimentScore, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
