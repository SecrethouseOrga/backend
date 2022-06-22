import {EntityHandler} from "./EntityHandler";
import {Buzz, Event, Player} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";
import {LoadStrategy, wrap} from "@mikro-orm/core";
import {BuzzData} from "../../types/request/bodyData";

export class BuzzHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, Buzz);
  }

  async createBuzz(payload: BuzzData, buzzer: Player, target: Player, event: Event) {
    const buzz = new Buzz(payload, buzzer, target, event);

    await this.repository.persistAndFlush(buzz);
    return buzz;
  }

  async findBuzzById(id: number) {
    return await this.repository.findOne({id: id});
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
