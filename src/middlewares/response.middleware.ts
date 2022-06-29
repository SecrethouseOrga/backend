import {NextFunction, Request, Response} from "express";
import {LoggerService} from "../services";

export function objectCreated(req: Request, res: Response, next: NextFunction) {
  req.resPayload.status = 201;
  next();
}

export function returnData(req: Request, res: Response, next: NextFunction) {
  req.resPayload.status = 200;
  next();
}

export function sendResponse(logger: LoggerService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.resPayload.dataToSend;
    const status = req.resPayload.status;
    logger.logInfo(logger.getRequestResponseLog(req.method, req.originalUrl, status, data));
    return res.status(status).send(data);
  };
}

