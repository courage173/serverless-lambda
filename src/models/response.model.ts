import { Status } from "../enums/status.enums";
import { StatusCode } from "../enums/status-code";

type ResponseHeader = { [header: string]: string | number | boolean };
interface IResponseBody {
  Provider: string | null;
  timestamp?: number | null;
  type: string | null;
  status: string | null;
}

interface IRequest {
  provider: string;
  timestamp: number;
  type: string;
}

interface IResponse {
  headers: ResponseHeader;
  body: string;
  statusCode: number;
}

interface IErrorRequest {
  message: string;
  status: string;
}

const STATUS_MESSAGES = {
  [StatusCode.OK]: Status.SUCCESS,
  [StatusCode.BAD_REQUEST]: Status.BAD_REQUEST,
  [StatusCode.ERROR]: Status.ERROR,
};

const RESPONSE_HEADERS: ResponseHeader = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
};

/**
 * class ResponseModel
 */
export class ResponseModel {
  private body: IResponseBody;

  private code: number;

  /**
   * ResponseModel Constructor
   * @param data
   */
  constructor(data: IRequest, code: number) {
    this.body = {
      Provider: data.provider,
      type: data.type,
      timestamp: data.timestamp,
      status: STATUS_MESSAGES[code],
    };
    this.code = code;
  }

  /**
   * Geneate a response
   * @return {IResponse}
   */
  generateResponse = (): IResponse => {
    return {
      headers: RESPONSE_HEADERS,
      statusCode: this.code,
      body: JSON.stringify(this.body),
    };
  };
}

/**
 * class errorModel
 */
export class ErrorResponseModel {
  private body: IErrorRequest;

  private code: number;

  constructor(message: string, code: number) {
    this.code = code;

    this.body = {
      message,
      status: STATUS_MESSAGES[code],
    };
  }

  /**
   * Geneate a response
   * @return {IResponse}
   */
  generateResponse = (): IResponse => {
    return {
      headers: RESPONSE_HEADERS,
      statusCode: this.code,
      body: JSON.stringify(this.body),
    };
  };
}
