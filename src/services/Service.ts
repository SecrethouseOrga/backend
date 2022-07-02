import {LoggerService} from "./LoggerService";
export class Service {
  private readonly name;
  protected logger;
  constructor(name: string, logger:LoggerService) {
    this.name = name;
    this.logger = logger;
  }

  get serviceName() {
    return this.name;
  }
}
