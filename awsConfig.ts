import AWS from 'aws-sdk';

// AWS CONFIG FILE

AWS.config.update({
  region: 'ap-northeast-1', // e.g., 'us-east-1'
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default dynamoDB;
