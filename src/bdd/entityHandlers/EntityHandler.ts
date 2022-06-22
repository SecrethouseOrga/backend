import {EntityManager} from "@mikro-orm/mysql";
import {AnyEntity, EntityName, EntityRepository} from "@mikro-orm/core";

export class EntityHandler {
  em:EntityManager;
  repository: EntityRepository<AnyEntity>;
  constructor(entityManager:EntityManager, entityName: EntityName<AnyEntity>) {
    this.em = entityManager;
    this.repository = entityManager.getRepository(entityName);
  }
}
