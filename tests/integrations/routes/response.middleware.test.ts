import {MockExpressMiddleware} from "../../../src/types/test";
import {getMockMiddleware, Logger} from "../setup";
import {
  errorHandler, objectCreated, returnData,
} from "../../../src/middlewares";
import {Request, Response} from "express";
import {config} from "dotenv";
import {BadRequestError} from "../../../src/errors/api";

describe("Test Response Operations Middlewares",()=>{
  let mock:MockExpressMiddleware;
  beforeAll(()=>{
    mock = getMockMiddleware();
    config();
  })

  beforeEach(()=>{
    mock.mockNext = jest.fn();
  })

  afterEach(()=>{
    mock.mockResponse = {};
  })

  test("Send 201 Status", ()=>{
    objectCreated(mock.mockRequest as Request,mock.mockResponse as Response, mock.mockNext);
    expect(mock.mockNext).toBeCalledTimes(1);
    expect(mock.mockRequest.resPayload.status).toBe(201);
   /* mock.mockResponse = {status:jest.fn(), send: jest.fn()};
    const middleware = sendResponse(Logger);
    middleware(mock.mockRequest as Request,mock.mockResponse as Response, mock.mockNext);
    expect(mock.mockResponse.status).toBeCalledWith(201);*/
  })

  test("Send 200 Status", ()=>{
    returnData(mock.mockRequest as Request,mock.mockResponse as Response, mock.mockNext);
    expect(mock.mockNext).toBeCalledTimes(1);
    expect(mock.mockRequest.resPayload.status).toBe(200);
  })

  test("Send API Errors Status", ()=>{
    const expectedMsgError = "Bad request";
    const error = new BadRequestError(expectedMsgError);
    errorHandler(Logger)(error,mock.mockRequest as Request,mock.mockResponse as Response, mock.mockNext);
    expect(mock.mockRequest.resPayload.status).toBe(400);
    expect(mock.mockRequest.resPayload.dataToSend).toBe(expectedMsgError);
  })

  test("Send Other Errors Status", ()=>{
    const expectedMsgError = "Internal Server Error";
    const error = new Error("Some dumb error");
    errorHandler(Logger)(error,mock.mockRequest as Request,mock.mockResponse as Response, mock.mockNext);
    expect(mock.mockRequest.resPayload.status).toBe(500);
    expect(mock.mockRequest.resPayload.dataToSend).toBe(expectedMsgError);
  })
})
