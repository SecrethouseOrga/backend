import {ValidationError} from "@mikro-orm/core";
import {ApiError, BadRequestError, ResourceNotFoundError} from "../errors";

export class ErrorService {
  static expTime= "24h";

  static isBddError(error: any):boolean {
    return error instanceof ValidationError;
  }

  static handleFindBddError(error:ValidationError, message= "Invalid Data"): ApiError {
    if (error.name === BddError.NotFoundError) {
      message = this.getNotFoundMessage(error.message);
      return new ResourceNotFoundError(message);
    }
    return new BadRequestError(message);
  }

  static handleBddError(error:ValidationError, message= "Invalid Data",): ApiError {
    console.log(error.message);
    if (error.name === BddError.NotFoundError) {
      message = this.getNotFoundMessage(error.message);
    }
    return new BadRequestError(message);
  }

  static getNotFoundMessage(message: string): string {
    return message.split("(")[0];
  }
}

export enum BddError{
  NotFoundError="NotFoundError",
}
