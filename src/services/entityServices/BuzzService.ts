import {EntityService} from "./EntityService";
import {Buzz, Event, Player} from "../../entities";
import {LoadStrategy, wrap} from "@mikro-orm/core";
import {BuzzData} from "../../types/request/bodyData";
import {EntityServiceData} from "../../types/api/services";
import {BddOperation} from "../../types/api/enums";

export class BuzzService extends EntityService {
  constructor(data: EntityServiceData) {
    super(data, "Buzz");
  }

  async createBuzz(payload: BuzzData, buzzer: Player, target: Player, event: Event) {
    const buzz = new Buzz(payload, buzzer, target, event);
    try {
      await this.repository.persistAndFlush(buzz);
      return buzz;
    } catch (e) {
      throw this.handleOperationError(BddOperation.CREATE, e);
    }
  }

  async findBuzzById(id: number) {
    try {
      return await this.repository.findOneOrFail({id: id});
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }

  async update(payload: any, id: number) {
    try {
      const buzz = await this.repository.findOneOrFail({id: id}, {
        populate: ["target"],
        strategy: LoadStrategy.JOINED,
      });

      wrap(buzz).assign(payload);
      await this.repository.flush();

      return buzz;
    } catch (e) {
      throw this.handleOperationError(BddOperation.UPDATE, e);
    }
  }
}
