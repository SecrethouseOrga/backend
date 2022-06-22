import {ValidationError} from "@mikro-orm/core";
import {
  ApiError,
  BadRequestError,
  ResourceNotFoundError,
  ServerSideError,
} from "../errors";

export class ErrorService {
  static expTime= "24h";

  static handleError(error: any, operation= Operation.UPDATE) : ApiError {
    if (this.isBddError(error)) {
      switch (operation) {
        case Operation.FIND:
          return this.handleFindBddError(<ValidationError> error);
        case Operation.UPDATE:
          return this.handleUpdateBddError(<ValidationError>error);
      }
    }
    return new ServerSideError();
  }

  private static isBddError(error: any):boolean {
    return error instanceof ValidationError;
  }

  private static handleFindBddError(error:ValidationError, message= "Invalid Parameters"): ApiError {
    if (error.name === BddError.NOT_FOUND) {
      message = this.getNotFoundMessage(error.message);
      return new ResourceNotFoundError(message);
    }
    return new BadRequestError(message);
  }

  private static handleUpdateBddError(error:ValidationError, message= "Invalid Data",): ApiError {
    console.log(error.message);
    switch (error.name) {
      case BddError.NOT_FOUND:
        message = this.getNotFoundMessage(error.message);
        break;
      case BddError.VALIDATION:
        message = "Wrong data type: Update/Create fail";
        break;
    }
    return new BadRequestError(message);
  }

  private static getNotFoundMessage(message: string): string {
    return message.split("(")[0];
  }
}

export enum Operation{
  FIND="find",
  UPDATE="update",
  DELETE="delete"
}
enum BddError{
  NOT_FOUND="NotFoundError",
  VALIDATION="ValidationError"
}
