import {BddService} from "../services";
import {BddError, EntityNotFoundError} from "../errors/bdd";
import {
  ApiError,
  BadRequestError,
  ResourceNotFoundError,
  ServerSideError,
} from "../errors/api";

export class Controller {
  protected name;
  protected bdd;

  constructor(name:string, bdd: BddService) {
    this.name = name;
    this.bdd = bdd;
  }

  handleMiddleWareError(error: any) : ApiError {
    if (error instanceof BddError) {
      const msg = error.serializeError();
      if (error instanceof EntityNotFoundError) return new ResourceNotFoundError(msg);
      else return new BadRequestError(msg);
    }
    return new ServerSideError(error);
  }
}
