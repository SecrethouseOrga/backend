import {EntityService} from "./EntityService";
import {Event, /* EventStatus,*/ EventTypes, Game, Player} from "../../entities";
import {EventData} from "../../types/request/bodyData";
import {LoadStrategy, wrap} from "@mikro-orm/core";
import {EntityServiceData} from "../../types/api/services";
import {BddOperation} from "../../types/api/enums";

export class EventService extends EntityService {
  constructor(data: EntityServiceData) {
    super(data);
  }

  async createEvent(payload: EventData, player: Player, game: Game, eventType: EventTypes) {
    const event = new Event(payload, player, game, eventType);
    try {
      await this.repository.persistAndFlush(event);
      return event;
    } catch (e) {
      throw this.handleOperationError(BddOperation.CREATE, e);
    }
  }

  async findEventById(id: number) {
    try {
      return await this.repository.findOneOrFail({id: id}, {
        populate: ["game"],
        strategy: LoadStrategy.JOINED,
      });
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }

  async findEventByGame(gameId: number) {
    try {
      return await this.repository.findOneOrFail({game: gameId});
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }

  async updateEvent(id: number, payload: any) {
    try {
      const event = await this.findEventById(id);

      if (!event) {
        return null;
      }

      wrap(event).assign(payload);
      await this.repository.flush();
      return event;
    } catch (e) {
      throw this.handleOperationError(BddOperation.UPDATE, e);
    }
  }

  async getCurrentEvents(idGame: number) {
    try {
      const events = <Event[]> await this.findEventByGame(idGame);
      // return events.filter((event) => event.status === EventStatus.STARTED);
      console.log(events);
      return events;
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }
}
