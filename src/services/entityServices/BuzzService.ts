import {EntityService} from "./EntityService";
import {Buzz, Event, Player} from "../../entities";
import {LoadStrategy, ValidationError, wrap} from "@mikro-orm/core";
import {BuzzData} from "../../types/request/bodyData";
import {EntityServiceData} from "../../types/api/services";
import {BddOperation} from "../../types/api/enums";

export class BuzzService extends EntityService {
  constructor(data: EntityServiceData) {
    super(data);
  }

  async createBuzz(payload: BuzzData, buzzer: Player, target: Player, event: Event) {
    const buzz = new Buzz(payload, buzzer, target, event);

    await this.repository.persistAndFlush(buzz);
    return buzz;
  }

  async findBuzzById(id: number) {
    try {
      return await this.repository.findOneOrFail({id: id});
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, <ValidationError>e);
    }
  }

  async update(payload: any, id: number) {
    const buzz = await this.repository.findOne({id: id}, {
      populate: ["target"],
      strategy: LoadStrategy.JOINED,
    });

    if (!buzz) {
      return null;
    }

    wrap(buzz).assign(payload);
    await this.repository.flush();

    return buzz;
  }
}
