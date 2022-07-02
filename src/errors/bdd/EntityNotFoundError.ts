import {BddError} from "./BddError";

export class EntityNotFoundError extends BddError {
  constructor(entityName:string) {
    super(entityName, "Not Found");
  }
}
