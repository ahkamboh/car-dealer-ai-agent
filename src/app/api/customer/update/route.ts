import { NextResponse } from "next/server";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function PUT(req: Request) {
  const body = await req.json();
  const { CustomerID, Name, Email, Password, City, Feedback, Notes } = body;

  if (!CustomerID) {
    return NextResponse.json({ error: "CustomerID must be provided" }, { status: 400 });
  }

  const params = {
    TableName: "PamVoiceAgent",
    Key: {
      PK: `CUSTOMER#${CustomerID}`,
      SK: `PROFILE#CUSTOMER#${CustomerID}`,
    },
    UpdateExpression: "SET #n = :n, Email = :e, Password = :p, City = :c, Feedback = :f, Notes = :no",
    ExpressionAttributeNames: {
      "#n": "Name",
    },
    ExpressionAttributeValues: {
      ":n": Name,
      ":e": Email,
      ":p": Password,
      ":c": City,
      ":f": Feedback,
      ":no": Notes,
    },
    ReturnValues: "UPDATED_NEW" as const, // Ensure this is typed as a literal
  };

  try {
    const data = await documentClient.send(new UpdateCommand(params));
    return NextResponse.json({ message: "Customer updated successfully", updatedAttributes: data.Attributes }, { status: 200 });
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json({ error: "Could not update customer" }, { status: 500 });
  }
}
