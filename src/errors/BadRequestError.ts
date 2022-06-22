import {ApiError} from "./ApiError";

export class BadRequestError extends ApiError {
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}
