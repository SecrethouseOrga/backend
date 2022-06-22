import {ApiError} from "./ApiError";

export class UnauthorizedError extends ApiError {
  statusCode = 401;
  constructor() {
    super("Access Denied");
  }
}
