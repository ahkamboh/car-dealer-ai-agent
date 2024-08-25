import { NextResponse } from 'next/server';
import { UpdateCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { dynamoDBClient } from '../../../../../awsConfig';

const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { CustomerID, Name, Email, City, ProfilePicture, VisitHistory, Feedback, Notes, CallTranscripts } = body;

    if (!CustomerID) {
      return NextResponse.json({ error: 'CustomerID is required' }, { status: 400 });
    }

    const params = {
      TableName: 'PamVoiceAgent',
      Key: {
        PK: `CUSTOMER#${CustomerID}`,
        SK: `PROFILE#${CustomerID}`,
      },
      UpdateExpression: 'SET #name = :name, Email = :email, City = :city, ProfilePicture = :profilePicture, VisitHistory = :visitHistory, Feedback = :feedback, Notes = :notes, CallTranscripts = :callTranscripts',
      ExpressionAttributeNames: {
        '#name': 'Name',
      },
      ExpressionAttributeValues: {
        ':name': Name,
        ':email': Email,
        ':city': City,
        ':profilePicture': ProfilePicture,
        ':visitHistory': VisitHistory || [],
        ':feedback': Feedback,
        ':notes': Notes,
        ':callTranscripts': CallTranscripts || [],
      },
      ReturnValues: 'ALL_NEW' as const, // Ensures the type is correct
    };

    const data = await documentClient.send(new UpdateCommand(params));

    return NextResponse.json({ message: 'Customer profile updated successfully', updatedAttributes: data.Attributes }, { status: 200 });
  } catch (error) {
    console.error('Error updating customer profile:', error);
    return NextResponse.json({ error: 'Could not update customer profile' }, { status: 500 });
  }
}
