import {BddService} from "./BddService";
import {LoggerService} from "./LoggerService";
import {MikroORM, Options} from "@mikro-orm/core";
import {MySqlDriver} from "@mikro-orm/mysql";
import mikroOrmConfig from "../configs/mikro-orm.config";

export let services: Services;

export async function createServices() {
  const loggerService = new LoggerService();
  const orm = await MikroORM.init<MySqlDriver>(<Options<MySqlDriver>>mikroOrmConfig());
  const bddService = new BddService(loggerService, orm);
  services = <Services> {logger: loggerService, bdd: bddService};
}
