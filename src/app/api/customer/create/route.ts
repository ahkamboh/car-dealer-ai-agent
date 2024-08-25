import { NextResponse } from 'next/server';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { dynamoDBClient } from '../../../../../awsConfig';

const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { Name, Email, Password, City, ProfilePicture, VisitHistory, Feedback, Notes, CallTranscripts } = body;

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
        VisitHistory: VisitHistory || [],
        OverallSentiment: null,
        Feedback,
        Notes,
        CreatedAt: createdAt,
        CallTranscripts: CallTranscripts || [],
      },
    };

    await documentClient.send(new PutCommand(params));

    return NextResponse.json({ message: 'Customer profile created successfully', customerID }, { status: 201 });
  } catch (error) {
    console.error('Error creating customer profile:', error);
    return NextResponse.json({ error: 'Could not create customer profile' }, { status: 500 });
  }
}
