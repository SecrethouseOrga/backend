import {EntityService} from "./EntityService";
import {Event, /* EventStatus,*/ EventTypes, Game, Player} from "../../entities";
import {EntityManager} from "@mikro-orm/mysql";
import {EventData} from "../../types/request/bodyData";
import {LoadStrategy, wrap} from "@mikro-orm/core";

export class EventService extends EntityService {
  constructor(entityManager: EntityManager) {
    super(entityManager, Event);
  }

  async createEvent(payload: EventData, player: Player, game: Game, eventType: EventTypes) {
    const event = new Event(payload, player, game, eventType);
    await this.repository.persistAndFlush(event);
    return event;
  }

  async findEventById(id: number) {
    return await this.repository.findOne({id: id}, {
      populate: ["game"],
      strategy: LoadStrategy.JOINED,
    });
  }

  async findEventByGame(gameId: number) {
    return await this.repository.findOne({game: gameId});
  }

  async updateEvent(id: number, payload: any) {
    const event = await this.findEventById(id);

    if (!event) {
      return null;
    }

    wrap(event).assign(payload);
    await this.repository.flush();
    return event;
  }

  async getCurrentEvents(idGame: number) {
    const events = <Event[]> await this.findEventByGame(idGame);
    // return events.filter((event) => event.status === EventStatus.STARTED);
    console.log(events);
    return events;
  }
}