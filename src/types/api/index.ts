import {BddService, LoggerService} from "../../services";

declare global{
  interface Services {
    bdd : BddService,
    logger: LoggerService,
  }
}
export {};
