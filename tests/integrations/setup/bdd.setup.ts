import {config} from "dotenv";
import {AnyEntity, EntityName, MikroORM, Options} from "@mikro-orm/core";
import {EntityManager, PostgreSqlDriver} from "@mikro-orm/postgresql";
import mikroOrmConfigTest from "../../configs/mikro-orm.config";
import {BddService, LoggerService} from "../../../src/services";
import {EntityServiceData} from "../../../src/types/api/services";

export async function initOrm() {
  config();
  return await MikroORM.init<PostgreSqlDriver>(<Options<PostgreSqlDriver>>mikroOrmConfigTest());
}

export const Logger = new LoggerService();

export function getEntityServiceData(em:EntityManager, entityName: EntityName<AnyEntity>): EntityServiceData {
  return <EntityServiceData>{entityManager: em, entityName: entityName, logger: Logger};
}

export async function initBddService() {
  const orm = await initOrm();
  return new BddService(Logger, orm);
}
