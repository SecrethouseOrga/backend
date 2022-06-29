import {PlayerData} from "../../types/request/bodyData/PlayerData";
import {Game, Genders, User, Player} from "../../entities";
import {EntityService} from "./EntityService";
import {LoadStrategy} from "@mikro-orm/core";
import {EntityServiceData} from "../../types/api/services";

export class PlayerService extends EntityService {
  constructor(data: EntityServiceData) {
    super(data);
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
      // TODO: send player entityName and player buzzer
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
