import {EntityManager} from "@mikro-orm/mysql";
import {AnyEntity, EntityName} from "@mikro-orm/core";
import {LoggerService} from "../../../services";

export interface EntityServiceData {
  entityManager:EntityManager,
  entityName: EntityName<AnyEntity>,
  logger:LoggerService
}

export {};
