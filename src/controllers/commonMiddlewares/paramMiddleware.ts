import {Request, Response, NextFunction} from "express";
import {BadRequestError} from "../../errors";

export function checkId(req: Request, res: Response, next: NextFunction) {
  const id: number = +req.params.id;
  if (isNaN(id) || id === 0) {
    throw new BadRequestError("id not valid");
  }
  next();
}
