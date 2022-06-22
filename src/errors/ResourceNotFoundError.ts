import {ApiError} from "./ApiError";

export class ResourceNotFoundError extends ApiError {
  statusCode = 404;
  constructor(message: string) {
    super(message);
  }
}
