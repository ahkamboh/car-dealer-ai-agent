import { NextResponse } from "next/server";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";
import { ReturnValue } from "@aws-sdk/client-dynamodb";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function PUT(req: Request) {
  const body = await req.json();
  const { CustomerID, CallID, CallTranscript, CallDate, Outcome, SentimentScore, Length, CallTopic } = body;

  if (!CustomerID || !CallID) {
    return NextResponse.json({ error: "CustomerID and CallID must be provided" }, { status: 400 });
  }

  const params = {
    TableName: "PamVoiceAgent",
    Key: {
      PK: `CUSTOMER#${CustomerID}`,
      SK: `CALL#RECORD#${CallID}`,
    },
    UpdateExpression:
      "SET CallTranscript = :ct, CallDate = :cd, Outcome = :o, SentimentScore = :ss, Length = :l, CallTopic = :ctopic",
    ExpressionAttributeValues: {
      ":ct": CallTranscript,
      ":cd": CallDate,
      ":o": Outcome,
      ":ss": SentimentScore,
      ":l": Length,
      ":ctopic": CallTopic,
    },
    ReturnValues: ReturnValue.UPDATED_NEW, // Use the correct enum value here
  };

  try {
    const data = await documentClient.send(new UpdateCommand(params));
    return NextResponse.json({ message: "Call record updated successfully", updatedAttributes: data.Attributes }, { status: 200 });
  } catch (error) {
    console.error("Error updating call record:", error);
    return NextResponse.json({ error: "Could not update call record" }, { status: 500 });
  }
}
