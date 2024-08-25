import { NextResponse } from "next/server";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function DELETE(req: Request) {
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
    await documentClient.send(new DeleteCommand(params));
    return NextResponse.json({ message: "Call record deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting call record:", error);
    return NextResponse.json({ error: "Could not delete call record" }, { status: 500 });
  }
}
