import {NextFunction, Request, Response} from "express";
import {ApiError, ServerSideError} from "../errors/api";
import {LoggerService} from "../services";

export function errorHandler(logger: LoggerService) {
  return (err: Error, req : Request, res: Response, next: NextFunction) => {
    let error : ApiError;
    if (!(err instanceof ApiError)) error = new ServerSideError(err.message);
    else error = <ApiError>err;
    const msg = (error instanceof ServerSideError)? error.fullError : error.serializeError();
    logger.logError(logger.getMiddlewareLog(req.method, req.baseUrl, msg));
    req.resPayload.status = error.statusCode;
    req.resPayload.dataToSend = error.serializeError();
    next();
    // return res.status(error.statusCode).send({error: error.serializeError()});
  };
}
