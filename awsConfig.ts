import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ComprehendClient } from "@aws-sdk/client-comprehend";

const dynamoDBClient = new DynamoDBClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const comprehendClient = new ComprehendClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export { dynamoDBClient, comprehendClient };
