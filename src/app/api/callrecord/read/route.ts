import { NextResponse } from "next/server";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const CustomerID = searchParams.get("CustomerID");
  const CallID = searchParams.get("CallID");

  if (!CustomerID || !CallID) {
    return NextResponse.json({ error: "CustomerID and CallID must be provided" }, { status: 400 });
  }

  const params = {
    TableName: "PamVoiceAgent",
    Key: {
      PK: `CUSTOMER#${CustomerID}`,
      SK: `CALL#RECORD#${CallID}`,
    },
  };

  try {
    const data = await documentClient.send(new GetCommand(params));
    if (!data.Item) {
      return NextResponse.json({ error: "Call record not found" }, { status: 404 });
    }
    return NextResponse.json(data.Item, { status: 200 });
  } catch (error) {
    console.error("Error reading call record:", error);
    return NextResponse.json({ error: "Could not read call record" }, { status: 500 });
  }
}
