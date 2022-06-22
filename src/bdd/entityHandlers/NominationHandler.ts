import {EntityHandler} from "./EntityHandler";
import {Event, Nomination, Player} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";

export class NominationHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, Nomination);
  }

  async createNomination(player: Player, target: Player, event: Event) {
    const nomination = new Nomination(player, target, event);
    await this.repository.persistAndFlush(nomination);
    return nomination;
  }

  async findNominationById(id: number) {
    return await this.repository.findOne({id: id});
  }
}
