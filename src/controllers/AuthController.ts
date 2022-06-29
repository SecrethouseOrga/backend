import {BddService} from "../services";
import {castToLoginData, castToUserData} from "../types/request/bodyData";
import {Controller} from "./Controller";
import {NextFunction, Request, Response} from "express";
import {BadRequestError} from "../errors/api";

export class AuthController extends Controller {
  constructor(bddService:BddService) {
    super("AuthController", bddService);
  }

  async registerUser(req:Request, res:Response, next:NextFunction) {
    const userData = castToUserData(req.body);
    if (userData === null) {
      throw new BadRequestError("Invalid User Data");
    }
    try {
      const user = await this.bdd.userService.createUser(userData);
      req.currentUser = {
        email: user.email,
        id: user.id,
      };
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  async logUser(req:Request, res:Response, next:NextFunction) {
    const login = castToLoginData(req.body);
    if (login == null) {
      throw new BadRequestError("Invalid Login Data");
    }
    try {
      const user = await this.bdd.userService.findUserByEmail(login.email);
      req.currentUser = {
        email: user.email,
        id: user.id,
      };
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  testToken(req:Request, res:Response, next:NextFunction) {
    req.resPayload.dataToSend = "Success";
    next();
  }
}
