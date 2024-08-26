import { NextResponse } from "next/server";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";
import { v2 as cloudinary } from "cloudinary";

// Initialize Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

interface CustomerData {
  Name?: string;
  Email?: string;
  City?: string;
  ProfilePicture?: string;
  VisitOutcome?: string;
  Purpose?: string;
  Transcript?: string;
  SentimentScore?: {
    Positive: number;
    Negative: number;
    Neutral: number;
    Mixed: number;
  };
  CallOutcome?: string;
  Feedback?: string;
  Notes?: string;
  OverallSentiment?: string;
}

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const CustomerID = searchParams.get("CustomerID");

    if (!CustomerID) {
      return NextResponse.json(
        { error: "CustomerID is required" },
        { status: 400 }
      );
    }

    const body: CustomerData = await req.json();

    let updateExpression = "SET";
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    // Handle ProfilePicture upload to Cloudinary
    let ProfilePictureURL = body.ProfilePicture;

    // Attempt to upload any image to Cloudinary, regardless of format
    if (ProfilePictureURL) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(ProfilePictureURL, {
          folder: "profile_pictures",
        });
        ProfilePictureURL = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Error uploading image to Cloudinary:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload image to Cloudinary." },
          { status: 500 }
        );
      }
    }

    // Build update expression
    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined) {
        const attributeName = `#${key.toLowerCase()}`;
        const attributeValue = `:${key.toLowerCase()}`;
        updateExpression += ` ${attributeName} = ${attributeValue},`;
        expressionAttributeNames[attributeName] = key;
        expressionAttributeValues[attributeValue] = key === 'ProfilePicture' ? ProfilePictureURL : value;
      }
    });

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
