import {EntityManager} from "@mikro-orm/postgresql";
import {AnyEntity, EntityName} from "@mikro-orm/core";
import {LoggerService} from "../../../services";

export interface EntityServiceData {
  entityManager:EntityManager,
  entityName: EntityName<AnyEntity>,
  logger:LoggerService
}

export {};
