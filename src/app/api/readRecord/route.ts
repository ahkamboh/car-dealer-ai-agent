import { NextResponse } from "next/server";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../awsConfig";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function GET(req: Request) {
  const pkPrefix = "TEST";
  const skPrefix = "RECORD";

  const params = {
    TableName: "PamVoiceAgent",
    FilterExpression:
      "begins_with(PK, :pkPrefix) AND begins_with(SK, :skPrefix)",
    ExpressionAttributeValues: {
      ":pkPrefix": pkPrefix,
      ":skPrefix": skPrefix,
    },
  };

  console.log("Scanning with params:", params); // Debugging log

  try {
    const data = await documentClient.send(new ScanCommand(params));
    console.log("Data retrieved:", data.Items); // Debugging log
    return NextResponse.json(data.Items, { status: 200 });
  } catch (error) {
    console.error("Error scanning records:", error);
    return NextResponse.json(
      { error: "Could not retrieve records" },
      { status: 500 }
    );
  }
}
