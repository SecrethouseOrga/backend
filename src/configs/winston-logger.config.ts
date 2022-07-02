import {LoggerOptions} from "winston";
import * as winston from "winston";

const options = function(): LoggerOptions {
  return {
    format: winston.format.json(),
    transports: [
      new winston.transports.File({filename: "error.log", level: "error"}),
      new winston.transports.File({filename: "combined.log"}),
      new winston.transports.Console({}),
    ],
  };
};

export default options;
