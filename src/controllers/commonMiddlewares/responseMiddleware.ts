import {NextFunction, Request, Response} from "express";

export function objectCreated(req: Request, res: Response, next: NextFunction) {
  return res.status(201).send(req.dataToSend);
}

export function sendData(req: Request, res: Response, next: NextFunction) {
  return res.status(200).send(req.dataToSend);
}
