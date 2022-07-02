import {MockExpressMiddleware} from "../../../src/types/test";
import {
  getMockMiddleware,
  getUserData,
  initBddService,
} from "../setup";
import {authVerification, tokenGeneration} from "../../../src/middlewares";
import {Request, Response} from "express";
import {config} from "dotenv";
import {UserPayload} from "../../../src/types/request";
import {BadRequestError, UnauthorizedError} from "../../../src/errors/api";
import {AuthController} from "../../../src/controllers";
import {BddService} from "../../../src/services";
import {castToLoginData, UserData} from "../../../src/types/request/bodyData";

describe("Test Authentication Middlewares",()=>{
  let mock:MockExpressMiddleware;
  let user: UserPayload;
  let userData: UserData;
  let authController:AuthController;
  let userId: number;
  let bddService: BddService;
  beforeAll(async ()=>{
    mock = getMockMiddleware();
    user = mock.mockRequest.currentUser;
    bddService = await initBddService();
    authController = new AuthController(bddService);
    config();
  })

  afterAll(async ()=>{
    await bddService.userService.deleteById(userId);
  })
  beforeEach(()=>{
    mock.mockNext = jest.fn();
  })

  test("Generate an authentication Token", ()=>{
    tokenGeneration(mock.mockRequest as Request, mock.mockResponse as Response, mock.mockNext);
    expect(mock.mockNext).toBeCalledTimes(1);
    expect(mock.mockRequest.resPayload.dataToSend === "").toBeFalsy();
  })

  test("Verify authentication Token", ()=>{
    tokenGeneration(mock.mockRequest as Request, mock.mockResponse as Response, mock.mockNext);
    mock.mockRequest.currentUser = <UserPayload>{email: "test@test", id: 0};
    mock.mockRequest.headers.token = mock.mockRequest.resPayload.dataToSend;
    authVerification(mock.mockRequest as Request, mock.mockResponse as Response, mock.mockNext);
    expect(mock.mockNext).toBeCalledTimes(2);
    expect(mock.mockRequest.currentUser.email).toBe(user.email);
  })

  test("Verify authentication Token Fails", ()=>{
    try {
      mock.mockRequest.headers.token = "";
      authVerification(mock.mockRequest as Request, mock.mockResponse as Response, mock.mockNext);
    }catch (e){
      expect(e instanceof UnauthorizedError).toBeTruthy();
    }

    try {
      mock.mockRequest.headers= {};
      authVerification(mock.mockRequest as Request, mock.mockResponse as Response, mock.mockNext);
    }catch (e){
      expect(e instanceof BadRequestError).toBeTruthy();
    }

    expect(mock.mockNext).toBeCalledTimes(0);
  })

  test("Register User", async ()=>{
    userData = getUserData(user.email,"AuthUsername");
    mock.mockRequest.body = userData;
    await authController.registerUser(mock.mockRequest as Request, mock.mockResponse as Response, mock.mockNext);
    expect(mock.mockNext).toBeCalledTimes(1);
    expect(mock.mockRequest.currentUser.email).toBe(user.email);
    userId = mock.mockRequest.currentUser.id;
  })

  test("Login User", async ()=>{
    const expectedData = {
      email: userData.email,
      password: userData.password,
    }
    const login = castToLoginData(expectedData);
    expect(login).toBeTruthy();

    mock.mockRequest.body= login;
    await authController.logUser(mock.mockRequest as Request, mock.mockResponse as Response, mock.mockNext);
    expect(mock.mockNext).toBeCalledTimes(1);
    expect(mock.mockRequest.currentUser.email).toBe(userData.email);
  })
})
