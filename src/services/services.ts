import {BddService} from "./BddService";
import {LoggerService} from "./LoggerService";

export let services: Services;

export function createServices() {
  const loggerService = new LoggerService();
  const bddService = new BddService(loggerService);
  services = <Services> {logger: loggerService, bdd: bddService};
}
