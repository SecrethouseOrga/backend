import {MockExpressMiddleware} from "../../../src/types/test";
import {getMockMiddleware} from "../setup";
import {
  checkId,
} from "../../../src/middlewares";
import {Request, Response} from "express";
import {config} from "dotenv";
import {BadRequestError} from "../../../src/errors/api";

describe("Test Request Parameter Operations Middlewares",()=>{
  let mock:MockExpressMiddleware;
  beforeAll(()=>{
    mock = getMockMiddleware();
    config();
  })

  beforeEach(()=>{
    mock.mockNext = jest.fn();
  })

  test("Check Request Parameter Id", ()=>{
    mock.mockRequest.params = {id:1};
    checkId(mock.mockRequest as Request,mock.mockResponse as Response, mock.mockNext);
    expect(mock.mockNext).toBeCalledTimes(1);
  })

  test("Check Request Parameter Id Fails", ()=>{
    mock.mockRequest.params = {id:"1A"};
    try {
      checkId(mock.mockRequest as Request,mock.mockResponse as Response, mock.mockNext);
    }catch (e){
      expect(e instanceof BadRequestError).toBeTruthy();
    }
  })
})
