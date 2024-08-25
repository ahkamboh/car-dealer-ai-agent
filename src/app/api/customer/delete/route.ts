import { NextResponse } from "next/server";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function DELETE(req: Request) {
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
    await documentClient.send(new DeleteCommand(params));
    return NextResponse.json({ message: "Customer deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json({ error: "Could not delete customer" }, { status: 500 });
  }
}
