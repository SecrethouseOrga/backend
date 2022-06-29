import {BddService} from "./BddService";
import {LoggerService} from "./LoggerService";

export let services: Services;

export function createServices() {
  services.logger = new LoggerService();
  services.bdd = new BddService(services.logger);
}
