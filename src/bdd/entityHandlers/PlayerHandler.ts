import {EntityManager} from "@mikro-orm/knex";
import {PlayerData} from "../../types/request/bodyData/PlayerData";
import {Game, Genders, User} from "../entities";
import {Player} from "../entities/Player";
import {EntityHandler} from "./EntityHandler";
import {LoadStrategy} from "@mikro-orm/core";

export class PlayerHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, Player);
  }

  async createPlayer(payload: PlayerData, user: User, game: Game, gender: Genders) {
    const player = new Player(payload, user, game, gender);
    await this.repository.persistAndFlush(player);
    return player;
  }

  async findPlayerById(id: number) {
    return await this.repository.findOne({id: id});
  }

  async findPlayerByUser(id: number) {
    return await this.repository.findOne(
        {user: id, game: {endDate: {$eq: null}}},
        {
          populate: ["game", "user"],
          strategy: LoadStrategy.JOINED,
        },
    );
  }

  async findPlayersByGame(id: number) {
    return await this.repository.find({game: id});
  }

  async getPlayerSecrets(gameId: number) {
    const players = <Player[]> await this.repository.find({game: gameId}, {fields: ["secret", "secretDiscovered"]});
    return players.map((player) => {
      const secret = (player.secretDiscovered) ? player.secret : "******";
      // TODO: send player name and player buzzer
      return {id: player.id, secret: secret};
    });
  }

  async secretDiscovered(id: number) {
    const player = await this.repository.findOne({id: id});
    if (player === null) return null;
    player.secretDiscovered = true;
    player.canBeBuzzed = false;
    await this.repository.flush();
    console.log(player);
    return player;
  }
}
