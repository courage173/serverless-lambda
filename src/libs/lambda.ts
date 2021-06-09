import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { Handler } from "aws-lambda";

export const middyfy = (handler: Handler): Handler => {
  const k = middy(handler).use(middyJsonBodyParser());
  console.log(typeof k);
  return k;
};
