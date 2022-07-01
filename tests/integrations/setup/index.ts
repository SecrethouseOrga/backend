import {AnyEntity, EntityName, MikroORM, Options} from "@mikro-orm/core";
import {EntityManager, MySqlDriver} from "@mikro-orm/mysql";
import {BddService, LoggerService} from "../../../src/services";
import {config} from "dotenv";
import mikroOrmConfigTest from "../../configs/mikro-orm.config";
import {EntityServiceData} from "../../../src/types/api/services";
import {PlayerData} from "../../../src/types/request/bodyData/PlayerData";
import {GameData, UserData} from "../../../src/types/request/bodyData";

export async function initOrm() {
  config();
  return await MikroORM.init<MySqlDriver>(<Options<MySqlDriver>>mikroOrmConfigTest());
}

export const Logger = new LoggerService();

export function getEntityServiceData(em:EntityManager, entityName: EntityName<AnyEntity>): EntityServiceData {
  return <EntityServiceData>{entityManager: em, entityName: entityName, logger: Logger};
}

export async function initBddService() {
  config();
  const orm = await MikroORM.init<MySqlDriver>(<Options<MySqlDriver>>mikroOrmConfigTest());
  return new BddService(Logger, orm);
}

export function getPlayerData(name:string, secret:string, gameCode:string): PlayerData {
  return <PlayerData>{secret: secret, name: name, gender: "male", gameCode: gameCode};
}

export function getUserData(email:string, username:string): UserData {
  return <UserData>{email: email, username: username, password: "!@pass"};
}

export function getGameData(): GameData {
  return <GameData>{maxPlayers: 2, eventIntervalQty: 100, eliminationDelayQty: 100,
    eliminationDelayUnity: "h", eventIntervalUnity: "h"};
}


