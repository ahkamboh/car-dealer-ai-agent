import { NextResponse } from 'next/server';
import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { dynamoDBClient } from '../../../../../awsConfig';

const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerID = searchParams.get('CustomerID');

    if (!customerID) {
      return NextResponse.json({ error: 'CustomerID is required' }, { status: 400 });
    }

    const params = {
      TableName: 'PamVoiceAgent',
      Key: {
        PK: `CUSTOMER#${customerID}`,
        SK: `PROFILE#${customerID}`,
      },
    };

    await documentClient.send(new DeleteCommand(params));

    return NextResponse.json({ message: 'Customer profile deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting customer profile:', error);
    return NextResponse.json({ error: 'Could not delete customer profile' }, { status: 500 });
  }
}
