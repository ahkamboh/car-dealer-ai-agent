import { NextResponse } from "next/server";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerID = searchParams.get("CustomerID");

  if (!customerID) {
    return NextResponse.json({ error: "CustomerID must be provided" }, { status: 400 });
  }

  const params = {
    TableName: "PamVoiceAgent",
    Key: {
      PK: `CUSTOMER#${customerID}`,
      SK: `PROFILE#CUSTOMER#${customerID}`,
    },
  };

  try {
    const data = await documentClient.send(new GetCommand(params));
    if (!data.Item) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    return NextResponse.json(data.Item, { status: 200 });
  } catch (error) {
    console.error("Error reading customer:", error);
    return NextResponse.json({ error: "Could not read customer" }, { status: 500 });
  }
}
