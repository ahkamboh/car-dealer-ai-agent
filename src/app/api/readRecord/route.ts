import { NextResponse } from "next/server";
import dynamoDB from "../../../../awsConfig";

export async function GET(req: Request) {
  const pkPrefix = "TEST";
  const skPrefix = "RECORD";

  const params = {
    TableName: "PamVoiceAgent",
    FilterExpression:
      "begins_with(PK, :pkPrefix) AND begins_with(SK, :skPrefix)",
    ExpressionAttributeValues: {
      ":pkPrefix": pkPrefix,
      ":skPrefix": skPrefix,
    },
  };

  console.log("Scanning with params:", params); // Debugging log

  try {
    const data = await dynamoDB.scan(params).promise();
    console.log("Data retrieved:", data.Items); // Debugging log
    return NextResponse.json(data.Items, { status: 200 });
  } catch (error) {
    console.error("Error scanning records:", error);
    return NextResponse.json(
      { error: "Could not retrieve records" },
      { status: 500 }
    );
  }
}
