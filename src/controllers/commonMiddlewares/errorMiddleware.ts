import {Request, Response, NextFunction} from "express";
import {ApiError} from "../../errors/ApiError";

export function errorHandler(err: Error, req : Request, res: Response, next: NextFunction) {
  {
    console.error(err);
    if (err instanceof ApiError) res.status(err.statusCode).send({error: err.serializeError()});
    else res.status(500).send({errors: [{message: "Something went wrong"}]});
  }
}
