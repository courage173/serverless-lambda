import * as AWS from "aws-sdk";
import { ErrorResponseModel } from "../models/response.model";

interface IResponse {
  id?: string;
  message?: string;
}
interface ISnsProps {
  provider: string;
  timestamp: number;
  type: string;
}
const PublishToSns = async ({
  provider,
  timestamp,
  type,
}: ISnsProps): Promise<IResponse> => {
  const data = {
    Provider: provider,
    timestamp,
    type,
  };

  const params = {
    Message: JSON.stringify(data),
    TopicArn: process.env.SNS_TOPIC_ARN,
  };
  const publishTextPromise = new AWS.SNS({
    apiVersion: "2010-03-31",
    region: process.env.SNS_AWS_REGION,
    credentials: {
      secretAccessKey: process.env.SNS_AWS_SECRETE_KEY,
      accessKeyId: process.env.SNS_AWS_ACCESS_KEY,
    },
  })
    .publish(params)
    .promise();
  return publishTextPromise
    .then((result) => {
      return {
        id: result.MessageId,
        message: params.Message,
      };
    })
    .catch((error) => {
      throw new ErrorResponseModel(error, 500);
    });
};

export default PublishToSns;
