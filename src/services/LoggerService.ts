import {createLogger} from "winston";
import {BddOperation} from "../types/api/enums";
import winstonLoggerConfig from "../configs/winston-logger.config";

export class LoggerService {
  private logger;
  constructor() {
    this.logger = createLogger(winstonLoggerConfig());
  }

  getMiddlewareLog(method:string, url:string, message:string) {
    return "type: Middleware, method: " + method + ", url: "+ url +", message: " + message;
  }

  getRequestResponseLog(method:string, url:string, statusCode:number, message:string) {
    return "type: Response, method: " + method + ", url: "+ url +", message: " + message;
  }

  getBddOperationLog(operation: BddOperation, entityName: string, message: string) {
    return "type: BDD, entity: "+entityName+", op: " + operation + ", message: " + message;
  }

  getServiceLog(serviceName: string, message:string) {
    return "type: Service, name: " + serviceName + ", message: " + message;
  }

  logInfo(message:string) {
    this.logger.info(message);
  }
  logWarn(message:string) {
    this.logger.warn(message);
  }
  logError(message:string) {
    this.logger.error(message);
  }
}
