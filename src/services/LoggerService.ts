import * as winston from "winston";
import {createLogger} from "winston";

export class LoggerService {
  private static logger: winston.Logger;

  static createLogger() {
    this.logger = createLogger({
      format: winston.format.json(),
      transports: [
        new winston.transports.File({filename: "error.log", level: "error"}),
        new winston.transports.File({filename: "combined.log"}),
      ],
    });
  }

  static get Logger(): winston.Logger {
    if (this.logger == null) {
      this.createLogger();
    }
    return this.logger;
  }
}
