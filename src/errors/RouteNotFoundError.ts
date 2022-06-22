import {ApiError} from "./ApiError";

export class RouteNotFoundError extends ApiError {
  statusCode = 404;
  constructor() {
    super("Route Not Found");
  }
}
