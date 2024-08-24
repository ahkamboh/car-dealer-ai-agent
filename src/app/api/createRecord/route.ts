import { NextResponse } from "next/server";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../awsConfig";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function POST(req: Request) {
  const body = await req.json();
  const { PK, SK, ...attributes } = body;

  const params = {
    TableName: "PamVoiceAgent",
    Item: {
      PK,
      SK,
      ...attributes,
    },
  };

  try {
    // Use the DynamoDB Document Client to put the item
    await documentClient.send(new PutCommand(params));
    console.log("Item created:", params.Item); // Debugging log
    return NextResponse.json(
      { message: "Record created successfully", item: params.Item },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json(
      { error: "Could not create record" },
      { status: 500 }
    );
  }
}
