import { NextResponse } from "next/server";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";
import { v4 as uuidv4 } from "uuid";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      Name,
      Email,
      Password,
      City,
      ProfilePicture,
      VisitOutcome,  
      Purpose,       // Extract Purpose from body
      CallOutcome,   // Extract CallOutcome from body
      Transcript,    // Extract Transcript from body
      SentimentScore, // Extract SentimentScore from body
      Feedback,
      Notes,
    } = body;

    const customerID = uuidv4();
    const createdAt = new Date().toISOString();

    const params = {
      TableName: 'PamVoiceAgent',
      Item: {
        PK: `CUSTOMER#${customerID}`,
        SK: `PROFILE#${customerID}`,
        CustomerID: customerID,
        Name,
        Email,
        Password,
        City,
        ProfilePicture,
        VisitOutcome,
        Purpose,
        Transcript,
        SentimentScore,
        CallOutcome,
        Feedback,
        OverallSentiment: null, // Assuming this is always null initially
        Notes,
        CreatedAt: createdAt,
      },
    };

    console.log('DynamoDB PutCommand params:', JSON.stringify(params, null, 2));

    await documentClient.send(new PutCommand(params));

    return NextResponse.json(
      { message: 'Customer profile created successfully', customerID },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating customer profile:', error.message);
    
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }

    return NextResponse.json(
      { error: 'Could not create customer profile' },
      { status: 500 }
    );
  }
}
