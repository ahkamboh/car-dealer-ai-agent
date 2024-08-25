import { NextResponse } from 'next/server';
import { GetCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { dynamoDBClient } from '../../../../../awsConfig';

const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function GET(req: Request) {
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

    const data = await documentClient.send(new GetCommand(params));

    if (!data.Item) {
      return NextResponse.json({ error: 'Customer profile not found' }, { status: 404 });
    }

    return NextResponse.json(data.Item, { status: 200 });
  } catch (error) {
    console.error('Error reading customer profile:', error);
    return NextResponse.json({ error: 'Could not read customer profile' }, { status: 500 });
  }
}
