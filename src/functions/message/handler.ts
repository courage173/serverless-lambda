import { middyfy } from "@libs/lambda";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { ResponseModel, ErrorResponseModel } from "../../models/response.model";
import verifyWebhook from "../../utils/ValidateWebhook";
import DatabaseService from "../../services/database.service";
import MessageModel from "../../models/message.model";
import PublishToSns from "../../services/sns.service";

import schema from "./schema";

const message: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { signature, "event-data": eventData } = event.body;
    if (signature) {
      // verify if its from mail gun
      const isMailgun = await verifyWebhook(signature);
      if (!isMailgun) {
        const error = new ErrorResponseModel("invalid request", 400);
        return error.generateResponse();
      }
      const databaseService = new DatabaseService();

      const modelValues = {
        timestamp: eventData.timestamp,
        token: signature.token,
        signature: signature.signature,
        event: eventData.event,
        id: eventData.id,
      };
      const messageModel = new MessageModel(modelValues);
      // get entity mapping
      const data = messageModel.getEntityMappings();
      const params = {
        TableName: process.env.MESSAGE_TABLE,
        Item: data,
      };
      // Inserts item into DynamoDB table
      await databaseService.create(params);
      const transformedData = {
        provider: "Mailgun",
        timestamp: modelValues.timestamp,
        type: eventData.event,
      };
      // publish to SNS
      await PublishToSns(transformedData);
      const result = new ResponseModel(transformedData, 200);
      return result.generateResponse();
    }

    const error = new ErrorResponseModel(
      "missing required signature parameter",
      400
    );
    return error.generateResponse();
  } catch (error) {
    const err = new ErrorResponseModel(error, 500);
    return err.generateResponse();
  }
};

export const main = middyfy(message);
