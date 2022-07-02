import {EntityManager} from "@mikro-orm/postgresql";
import {AnyEntity, EntityRepository, NotFoundError, ValidationError} from "@mikro-orm/core";
import {Service} from "../Service";
import {BddOperation} from "../../types/api/enums";
import {
  BddError,
  EntityNotFoundError,
  ValidationDataError,
} from "../../errors/bdd";
import {EntityServiceData} from "../../types/api/services";

export class EntityService extends Service {
  protected em:EntityManager;
  protected repository: EntityRepository<AnyEntity>;
  protected entityName:string;
  constructor(data: EntityServiceData, plainEntityName: string) {
    super(data.entityName + "Service", data.logger);
    this.em = data.entityManager;
    this.entityName = plainEntityName;
    this.repository = this.em.getRepository(data.entityName);
  }

  protected handleOperationError(operation: BddOperation, e:any): BddError {
    let error = e;
    let msg = e.toString();
    if (e instanceof ValidationError) {
      error = <ValidationError> e;
      msg = error.message;
    }
    this.logger.logError(this.logger.getBddOperationLog(operation, this.entityName, msg));
    if (error instanceof NotFoundError) return new EntityNotFoundError(this.entityName);
    else return new ValidationDataError(this.entityName);
  }

  get EntityName() {
    return this.entityName;
  }

  async deleteById(id:number) {
    try {
      return await this.repository.nativeDelete({id: id});
    } catch (e) {
      throw this.handleOperationError(BddOperation.DELETE, e);
    }
  }
}
