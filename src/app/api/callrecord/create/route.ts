import { NextResponse } from "next/server";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";
import { v4 as uuidv4 } from "uuid";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function POST(req: Request) {
  const body = await req.json();
  const callID = uuidv4();
  const { CustomerID, CallTranscript, CallDate, Outcome, SentimentScore, Length, CallTopic } = body;

  const params = {
    TableName: "PamVoiceAgent",
    Item: {
      PK: `CUSTOMER#${CustomerID}`,
      SK: `CALL#RECORD#${callID}`,
      CallID: callID,
      CallTranscript,
      CallDate,
      Outcome,
      SentimentScore,
      Length,
      CallTopic,
    },
  };

  try {
    await documentClient.send(new PutCommand(params));
    return NextResponse.json({ message: "Call record created successfully", item: params.Item }, { status: 201 });
  } catch (error) {
    console.error("Error creating call record:", error);
    return NextResponse.json({ error: "Could not create call record" }, { status: 500 });
  }
}
