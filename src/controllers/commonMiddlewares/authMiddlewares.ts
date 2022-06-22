import {Request, Response, NextFunction} from "express";
import {TokenService} from "../../services";
import {BadRequestError, UnauthorizedError} from "../../errors";

export function tokenGeneration(req: Request, res: Response, next: NextFunction) {
  const token = TokenService.generateToken(req.currentUser);
  console.log(token);
  res.status(200).send(token);
}

export function authVerification(req : Request, res: Response, next: NextFunction) {
  if (! ("token" in req.headers)) throw new BadRequestError("Need an authorization token");
  const payload = TokenService.verifyToken(<string>req.headers["token"]);
  if (payload == null) throw new UnauthorizedError();
  req.currentUser = payload;
  next();
}
