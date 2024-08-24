import { NextResponse } from "next/server";
import dynamoDB from "../../../../awsConfig";

export async function POST(req: Request) {
  const body = await req.json();
  const { PK, SK, ...attributes } = body;

  const params = {
    TableName: "PamVoiceAgent",
    Item: {
      PK,
      SK,
      ...attributes,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    console.log("Item created:", params.Item); // Debugging log
    return NextResponse.json(
      { message: "Record created successfully", item: params.Item },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json(
      { error: "Could not create record" },
      { status: 500 }
    );
  }
}
