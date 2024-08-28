import { NextResponse } from "next/server";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";

// Initialize Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      ProfilePicture, // This will be a Base64 encoded string
      VisitOutcome,
      Purpose,
      CallOutcome,
      Transcript,
      SentimentScore,
      Feedback,
      Notes,
    } = body;

    let ProfilePictureURL = "";

    // Upload ProfilePicture to Cloudinary
    if (ProfilePicture) {
      const uploadResponse = await cloudinary.uploader.upload(ProfilePicture, {
        folder: "profile_pictures",
      });
      ProfilePictureURL = uploadResponse.secure_url; // Store the Cloudinary URL
    }
     
    const customerID = uuidv4();
    const createdAt = new Date().toISOString();

    const params = {
      TableName: "PamVoiceAgent",
      Item: {
        PK: `CUSTOMER#${customerID}`,
        SK: `PROFILE#${customerID}`,
        CustomerID: customerID,
        Name,
        Email,
        Password,
        City,
        ProfilePicture: ProfilePictureURL, // Store the URL instead of Base64
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

    await documentClient.send(new PutCommand(params));

    return NextResponse.json(
      { message: "Customer profile created successfully", customerID },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating customer profile:", error.message);

    if (error instanceof Error) {
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      { error: "Could not create customer profile" },
      { status: 500 }
    );
  }
}
