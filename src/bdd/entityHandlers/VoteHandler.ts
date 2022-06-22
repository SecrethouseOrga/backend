import {EntityHandler} from "./EntityHandler";
import {Event, Player, User, Vote} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";

export class VoteHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, Vote);
  }

  async createVote(user: User, target: Player, event: Event) {
    const vote = new Vote(user, target, event);
    await this.repository.persistAndFlush(vote);
    return vote;
  }

  async findVoteById(id: number) {
    return await this.repository.findOne({id: id});
  }
}
