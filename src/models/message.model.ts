import { v4 as UUID } from "uuid";

// Interfaces
interface IMessageProps {
  id?: string;
  timestamp: number;
  token: string;
  signature: string;
  event: string;
}
interface IMessageInterface {
  id: string;
  signature: {
    timestamp: number;
    token: string;
    signature: string;
  };
  "event-data": {
    event: string;
    timestamp: number;
    id: string;
  };
}

export default class MessageModel {
  private _id: string;

  private _timestamp: number;

  private _token: string;

  private _signature: string;

  private _event: string;

  private _eventId: string;

  constructor({ id, timestamp, token, signature, event }: IMessageProps) {
    this._id = UUID();
    this._timestamp = timestamp;
    this._eventId = id;
    this._token = token;
    this._signature = signature;
    this._event = event;
  }

  /**
   * Get Base entity mappings
   * @return {IMessageInterface}
   */
  getEntityMappings(): IMessageInterface {
    return {
      id: this._id,
      signature: {
        timestamp: this._timestamp,
        token: this._token,
        signature: this._signature,
      },
      "event-data": {
        event: this._event,
        timestamp: this._timestamp,
        id: this._eventId,
      },
    };
  }
}
