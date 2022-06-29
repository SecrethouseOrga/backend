import {Request, Response, NextFunction} from "express";
import {TokenHandler} from "../services";
import {BadRequestError, UnauthorizedError} from "../errors/api";

export function tokenGeneration(req: Request, res: Response, next: NextFunction) {
  req.resPayload.dataToSend = TokenHandler.generateToken(req.currentUser);
  next();
}

export function authVerification(req : Request, res: Response, next: NextFunction) {
  if (! ("token" in req.headers)) throw new BadRequestError("Need an authorization token");
  const payload = TokenHandler.verifyToken(<string>req.headers["token"]);
  if (payload == null) throw new UnauthorizedError();
  req.currentUser = payload;
  next();
}
