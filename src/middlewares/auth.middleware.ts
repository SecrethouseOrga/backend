import {Request, Response, NextFunction} from "express";
import {BadRequestError, UnauthorizedError} from "../errors/api";
import {TokenUtils} from "../utils";

export function tokenGeneration(req: Request, res: Response, next: NextFunction) {
  req.resPayload.dataToSend = TokenUtils.generateToken(req.currentUser);
  console.log("coucou");
  next();
}

export function authVerification(req : Request, res: Response, next: NextFunction) {
  if (! ("token" in req.headers)) throw new BadRequestError("Need an authorization token");
  const payload = TokenUtils.verifyToken(<string>req.headers["token"]);
  if (payload == null) throw new UnauthorizedError();
  req.currentUser = payload;
  next();
}
