import {ApiError} from "./ApiError";

export class ServerSideError extends ApiError {
  statusCode = 500;
  fullError;
  constructor(error:string) {
    super("Internal Server Error");
    this.fullError = error;
  }
}
