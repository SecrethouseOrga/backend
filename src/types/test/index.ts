import {NextFunction, Response} from "express";

export interface MockExpressMiddleware{
  mockRequest: any;
  mockResponse: Partial<Response>;
  mockNext: NextFunction;
}
