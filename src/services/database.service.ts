import * as AWS from "aws-sdk";

// Models
import { ErrorResponseModel } from "../models/response.model";

// Put
type PutItem = AWS.DynamoDB.DocumentClient.PutItemInput;
type PutItemOutput = AWS.DynamoDB.DocumentClient.PutItemOutput;

// Query
type QueryItem = AWS.DynamoDB.DocumentClient.QueryInput;
type QueryItemOutput = AWS.DynamoDB.DocumentClient.QueryOutput;

// Get
type GetItem = AWS.DynamoDB.DocumentClient.GetItemInput;
type GetItemOutput = AWS.DynamoDB.DocumentClient.GetItemOutput;

const documentClient = new AWS.DynamoDB.DocumentClient({
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
  },
  region: process.env.DYNAMODB_REGION,
  endpoint:
    process.env.DYNAMODB_LOCAL_STAGE === "dev"
      ? process.env.DYNAMODB_LOCAL_ENDPOINT
      : `https://dynamodb.${process.env.DYNAMODB_REGION}.amazonaws.com`,
});

export default class DatabaseService {
  create = async (params: PutItem): Promise<PutItemOutput> => {
    try {
      return await documentClient.put(params).promise();
    } catch (error) {
      throw new ErrorResponseModel(`create-error: ${error}`, 500);
    }
  };

  query = async (params: QueryItem): Promise<QueryItemOutput> => {
    try {
      return await documentClient.query(params).promise();
    } catch (error) {
      throw new ErrorResponseModel(`query-error: ${error}`, 500);
    }
  };

  get = async (params: GetItem): Promise<GetItemOutput> => {
    try {
      return await documentClient.get(params).promise();
    } catch (error) {
      throw new ErrorResponseModel(`get-error: ${error}`, 500);
    }
  };
}
