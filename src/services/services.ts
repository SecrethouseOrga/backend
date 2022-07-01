import {BddService} from "./BddService";
import {LoggerService} from "./LoggerService";
import {MikroORM, Options} from "@mikro-orm/core";
import {MySqlDriver} from "@mikro-orm/mysql";
import mikroOrmConfig from "../configs/mikro-orm.config";

export let services: Services;

export function createServices() {
  const loggerService = new LoggerService();
  let bddService: BddService;
  MikroORM.init<MySqlDriver>(<Options<MySqlDriver>>mikroOrmConfig()).then((r)=>{
    bddService = new BddService(loggerService, r);
    services = <Services> {logger: loggerService, bdd: bddService};
  });
}
