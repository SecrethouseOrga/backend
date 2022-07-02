import {BddService} from "./BddService";
import {LoggerService} from "./LoggerService";
import {MikroORM, Options} from "@mikro-orm/core";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import mikroOrmConfig from "../configs/mikro-orm.config";

export let services: Services;

export async function createServices() {
  const loggerService = new LoggerService();
  const orm = await MikroORM.init<PostgreSqlDriver>(<Options<PostgreSqlDriver>>mikroOrmConfig());
  const bddService = new BddService(loggerService, orm);
  services = <Services> {logger: loggerService, bdd: bddService};
}
