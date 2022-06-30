import {PlayerData} from "../../types/request/bodyData/PlayerData";
import {Game, Genders, User, Player} from "../../entities";
import {EntityService} from "./EntityService";
import {LoadStrategy} from "@mikro-orm/core";
import {EntityServiceData} from "../../types/api/services";
import {BddOperation} from "../../types/api/enums";

export class PlayerService extends EntityService {
  constructor(data: EntityServiceData) {
    super(data);
  }

  async createPlayer(payload: PlayerData, user: User, game: Game, gender: Genders) {
    const player = new Player(payload, user, game, gender);
    try {
      await this.repository.persistAndFlush(player);
      return player;
    } catch (e) {
      throw this.handleOperationError(BddOperation.CREATE, e);
    }
  }

  async findPlayerById(id: number) {
    try {
      return await this.repository.findOneOrFail({id: id});
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }

  async findPlayerByUser(id: number) {
    try {
      return await this.repository.findOneOrFail(
          {user: id, game: {endDate: {$eq: null}}},
          {
            populate: ["game", "user"],
            strategy: LoadStrategy.JOINED,
          },
      );
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }

  async findPlayersByGame(id: number) {
    try {
      return await this.repository.find({game: id});
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }

  async getPlayerSecrets(gameId: number) {
    try {
      const players = <Player[]> await this.repository.find({game: gameId}, {fields: ["secret", "secretDiscovered"]});
      return players.map((player) => {
        const secret = (player.secretDiscovered) ? player.secret : "******";
        // TODO: send player entityName and player buzzer
        return {id: player.id, secret: secret};
      });
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }

  async secretDiscovered(id: number) {
    try {
      const player = await this.repository.findOneOrFail({id: id});
      if (player === null) return null;
      player.secretDiscovered = true;
      player.canBeBuzzed = false;
      await this.repository.flush();
      console.log(player);
      return player;
    } catch (e) {
      throw this.handleOperationError(BddOperation.UPDATE, e);
    }
  }
}
