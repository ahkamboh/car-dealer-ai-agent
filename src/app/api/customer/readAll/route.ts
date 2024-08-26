import { NextResponse } from "next/server";
import { ScanCommand, DynamoDBDocumentClient, ScanCommandInput, ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";

const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function GET() {
  try {
    const params: ScanCommandInput = {
      TableName: "PamVoiceAgent",
      ConsistentRead: true,
    };

    let data: Record<string, any>[] = [];
    let ExclusiveStartKey: Record<string, any> | undefined;

    do {
      const scanParams: ScanCommandInput = { ...params, ExclusiveStartKey };
      const scanResults: ScanCommandOutput = await documentClient.send(new ScanCommand(scanParams));
      data = data.concat(scanResults.Items ?? []);
      ExclusiveStartKey = scanResults.LastEvaluatedKey;
    } while (ExclusiveStartKey);

    return NextResponse.json(
      {
        message: "Customer profiles retrieved successfully",
        data: data,
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
