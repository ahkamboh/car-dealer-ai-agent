import { NextResponse } from "next/server";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function GET() {
  try {
    const params = {
      TableName: "PamVoiceAgent",
      ProjectionExpression: "SentimentScore", // Only fetch the SentimentScore field
    };

    const data = await documentClient.send(new ScanCommand(params));

    if (!data.Items) {
      return NextResponse.json(
        { error: "No sentiment data found" },
        { status: 404 }
      );
    }

    // Aggregate the sentiment scores, considering the exact case
    const sentimentCounts = data.Items.reduce(
      (
        acc: { Positive: number; Negative: number; Neutral: number },
        item: any
      ) => {
        if (item.SentimentScore === "POSITIVE") acc.Positive++;
        if (item.SentimentScore === "NEGATIVE") acc.Negative++;
        if (item.SentimentScore === "NEUTRAL") acc.Neutral++;
        return acc;
      },
      { Positive: 0, Negative: 0, Neutral: 0 }
    );

    return NextResponse.json(
      {
        message: "Sentiment analysis summary retrieved successfully",
        sentimentCounts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving sentiment analysis summary:", error);
    return NextResponse.json(
      { error: "Failed to retrieve sentiment analysis summary" },
      { status: 500 }
    );
  }
}
