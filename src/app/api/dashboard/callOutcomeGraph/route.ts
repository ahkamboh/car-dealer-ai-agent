import { NextResponse } from "next/server";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../../../../../awsConfig";
import { startOfWeek, endOfWeek, format } from "date-fns";

// Initialize the DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export async function GET() {
  try {
    const params = {
      TableName: "PamVoiceAgent",
      ProjectionExpression: "CallOutcome, CreatedAt", // Only fetch the CallOutcome and CreatedAt fields
    };

    const data = await documentClient.send(new ScanCommand(params));

    if (!data.Items) {
      return NextResponse.json(
        { error: "No call outcome data found" },
        { status: 404 }
      );
    }

    // Define the start and end of the current week
    const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Week starts on Monday
    const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    // Aggregate the call outcomes by day of the week
    const weeklySales = data.Items.reduce(
      (
        acc: Record<string, { Sale: number; NoSale: number }>,
        item: any
      ) => {
        const createdAt = new Date(item.CreatedAt);
        if (createdAt >= startOfWeekDate && createdAt <= endOfWeekDate) {
          const day = format(createdAt, "EEEE"); // Get the day of the week

          if (!acc[day]) {
            acc[day] = { Sale: 0, NoSale: 0 };
          }

          if (item.CallOutcome === "Sale") {
            acc[day].Sale++;
          } else if (item.CallOutcome === "No Sale") {
            acc[day].NoSale++;
          }
        }
        return acc;
      },
      {
        Monday: { Sale: 0, NoSale: 0 },
        Tuesday: { Sale: 0, NoSale: 0 },
        Wednesday: { Sale: 0, NoSale: 0 },
        Thursday: { Sale: 0, NoSale: 0 },
        Friday: { Sale: 0, NoSale: 0 },
        Saturday: { Sale: 0, NoSale: 0 },
        Sunday: { Sale: 0, NoSale: 0 },
      }
    );

    return NextResponse.json(
      {
        message: "Call outcome summary retrieved successfully",
        weeklySales,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving call outcome summary:", error);
    return NextResponse.json(
      { error: "Failed to retrieve call outcome summary" },
      { status: 500 }
    );
  }
}
