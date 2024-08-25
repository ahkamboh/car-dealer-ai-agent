import { NextResponse } from "next/server";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";
import { v4 as uuidv4 } from "uuid";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function POST(req: Request) {
  const body = await req.json();
  const customerID = uuidv4();
  const { Name, Email, Password, City, Feedback, Notes } = body;

  const params = {
    TableName: "PamVoiceAgent",
    Item: {
      PK: `CUSTOMER#${customerID}`,
      SK: `PROFILE#CUSTOMER#${customerID}`,
      CustomerID: customerID,
      Name,
      Email,
      Password,
      City,
      VisitHistory: [],
      OverallSentiment: null,
      Feedback,
      Notes,
    },
  };

  try {
    await documentClient.send(new PutCommand(params));
    return NextResponse.json({ message: "Customer created successfully", item: params.Item }, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json({ error: "Could not create customer" }, { status: 500 });
  }
}
