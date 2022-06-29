import {BddError} from "./BddError";

export class ValidationDataError extends BddError {
  constructor(entityName:string) {
    super(entityName, "Wrong Data");
  }
}
