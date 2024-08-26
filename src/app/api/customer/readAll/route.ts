import { NextResponse } from "next/server";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";

const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function GET() {
  try {
    const params = {
      TableName: "PamVoiceAgent",
      ConsistentRead: true, // Force strong consistency
    };

    const data = await documentClient.send(new ScanCommand(params));

    return NextResponse.json(
      {
        message: "Customer profiles retrieved successfully",
        data: data.Items,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving customer profiles:", error);
    return NextResponse.json(
      { error: "Could not retrieve customer profiles" },
      { status: 500 }
    );
  }
}
