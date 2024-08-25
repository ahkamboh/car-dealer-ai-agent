import { NextResponse } from "next/server";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";
import { v4 as uuidv4 } from "uuid";

const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const CustomerID = searchParams.get("CustomerID");

    if (!CustomerID) {
      return NextResponse.json(
        { error: "CustomerID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      Name,
      Email,
      City,
      ProfilePicture,
      VisitHistory,
      Feedback,
      Notes,
      CallTranscripts,
    } = body;

    let updateExpression = "SET";
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    if (Name !== undefined) {
      updateExpression += " #name = :name,";
      expressionAttributeNames["#name"] = "Name";
      expressionAttributeValues[":name"] = Name;
    }

    if (Email !== undefined) {
      updateExpression += " Email = :email,";
      expressionAttributeValues[":email"] = Email;
    }

    if (City !== undefined) {
      updateExpression += " City = :city,";
      expressionAttributeValues[":city"] = City;
    }

    if (ProfilePicture !== undefined) {
      updateExpression += " ProfilePicture = :profilePicture,";
      expressionAttributeValues[":profilePicture"] = ProfilePicture;
    }

    if (VisitHistory !== undefined) {
      const structuredVisitHistory = VisitHistory.map((visit: any) => ({
        VisitDate: visit.VisitDate,
        Purpose: visit.Purpose,
        VisitOutcome: visit.VisitOutcome,
      }));
      updateExpression += " VisitHistory = :visitHistory,";
      expressionAttributeValues[":visitHistory"] = structuredVisitHistory;
    }

    if (Feedback !== undefined) {
      updateExpression += " Feedback = :feedback,";
      expressionAttributeValues[":feedback"] = Feedback;
    }

    if (Notes !== undefined) {
      updateExpression += " Notes = :notes,";
      expressionAttributeValues[":notes"] = Notes;
    }

    if (CallTranscripts !== undefined) {
      const structuredCallTranscripts = CallTranscripts.map((call: any) => ({
        CallID: call.CallID || uuidv4(),
        Transcript: call.Transcript,
        CallDate: call.CallDate,
        CallOutcome: call.CallOutcome,
        SentimentScore: call.SentimentScore,
      }));
      updateExpression += " CallTranscripts = :callTranscripts,";
      expressionAttributeValues[":callTranscripts"] = structuredCallTranscripts;
    }

    updateExpression = updateExpression.slice(0, -1);

    const params = {
      TableName: "PamVoiceAgent",
      Key: {
        PK: `CUSTOMER#${CustomerID}`,
        SK: `PROFILE#${CustomerID}`,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: Object.keys(expressionAttributeNames).length
        ? expressionAttributeNames
        : undefined,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW" as const,
    };

    const data = await documentClient.send(new UpdateCommand(params));

    return NextResponse.json(
      {
        message: "Customer profile updated successfully",
        updatedAttributes: data.Attributes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating customer profile:", error);
    return NextResponse.json(
      { error: "Could not update customer profile" },
      { status: 500 }
    );
  }
}
