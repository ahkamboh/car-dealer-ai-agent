import { NextResponse } from "next/server";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../awsConfig";

const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function PUT(req: Request) {
  try {
    // Parse the CustomerID from the query parameters
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
      VisitOutcome,
      Purpose,
      Transcript,
      SentimentScore,
      CallOutcome,
      Feedback,
      Notes,
      OverallSentiment
    } = body;

    // Build the UpdateExpression and ExpressionAttributeValues dynamically
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

    if (VisitOutcome !== undefined) {
      updateExpression += " VisitOutcome = :visitOutcome,";
      expressionAttributeValues[":visitOutcome"] = VisitOutcome;
    }

    if (Purpose !== undefined) {
      updateExpression += " Purpose = :purpose,";
      expressionAttributeValues[":purpose"] = Purpose;
    }

    if (Transcript !== undefined) {
      updateExpression += " Transcript = :transcript,";
      expressionAttributeValues[":transcript"] = Transcript;
    }

    if (SentimentScore !== undefined) {
      updateExpression += " SentimentScore = :sentimentScore,";
      expressionAttributeValues[":sentimentScore"] = SentimentScore;
    }

    if (CallOutcome !== undefined) {
      updateExpression += " CallOutcome = :callOutcome,";
      expressionAttributeValues[":callOutcome"] = CallOutcome;
    }

    if (Feedback !== undefined) {
      updateExpression += " Feedback = :feedback,";
      expressionAttributeValues[":feedback"] = Feedback;
    }

    if (Notes !== undefined) {
      updateExpression += " Notes = :notes,";
      expressionAttributeValues[":notes"] = Notes;
    }

    if (OverallSentiment !== undefined) {
      updateExpression += " OverallSentiment = :overallSentiment,";
      expressionAttributeValues[":overallSentiment"] = OverallSentiment;
    }

    // Remove the trailing comma from the UpdateExpression
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
