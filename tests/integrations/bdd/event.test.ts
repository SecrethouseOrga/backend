import {BddService} from "../../../src/services";
import {EventService} from "../../../src/services/entityServices";
import {
  Event,
  EventStatus,
  EventTypes,
  Game,
  Player,
  User,
} from "../../../src/entities";
import {
  getGameData,
  getPlayerData,
  getUserData,
  initBddService,
} from "../setup";
import {castToEventData, EventData} from "../../../src/types/request/bodyData";
import {
  EntityNotFoundError,
  ValidationDataError,
} from "../../../src/errors/bdd";

describe("Test event Bdd Operations", ()=> {
  let bddService: BddService;
  let eventService:EventService;
  let game: Game;
  let player: Player;
  let user: User;
  let eventId: number;
  const eventType= EventTypes.BUZZ;
  beforeAll(async ()=>{
    bddService = <BddService> await initBddService();
    const code = "#EG622G";
    user = await bddService.userService.createUser(getUserData("Event@Event", "EventUsername"));
    game = await bddService.gameService.createGame(getGameData(), user, code);
    player = await bddService.playerService.createPlayer(getPlayerData("EventPlayer", "Des Events secretes", code), user, game);
    eventService = bddService.eventService;
  });

  afterAll(async ()=>{
    await bddService.eventService.deleteById(eventId);
    await bddService.playerService.deleteById(player.id);
    await bddService.gameService.deleteById(game.id);
    await bddService.userService.deleteById(user.id);
  });

  test("Create event", async () => {
    const expectedData = {
      content: "Je crée un event",
      gameId: game.id,
    };
    const eventData = castToEventData(expectedData);
    expect(eventData).toBeTruthy();

    const event = await eventService.createEvent(<EventData>eventData, player, game, eventType);
    expect(event).toBeTruthy();
    expect(event.game.id).toBe(game.id);
    expect(event.player.id).toBe(player.id);
    expect(event.type).toBe(eventType);
    eventId = event.id;
  });

  test("Create event Fails", async () => {
    const falseData = {
      game: game.id,
    };
    let eventData = castToEventData(falseData);
    expect(eventData).toBeFalsy();
    eventData = <EventData>eventData;

    try {
      await eventService.createEvent(eventData, player, game, eventType);
    } catch (e) {
      expect(e instanceof ValidationDataError).toBeTruthy();
      const error = <ValidationDataError>e;
      expect(error.message == "Wrong Data").toBeTruthy();
      expect(error.entityName == eventService.EntityName).toBeTruthy();
    }
  });

  test("Find event by Id", async () => {
    const event = await eventService.findEventById(eventId);
    expect(event).toBeTruthy();
    expect(event.game).toBeTruthy();
    expect(event.game.id).toBe(game.id);
  });

  test("Find event by Id Fails", async () => {
    try {
      await eventService.findEventById(-1);
    } catch (e) {
      expect(e instanceof EntityNotFoundError).toBeTruthy();
      const error = <EntityNotFoundError>e;
      expect(error.entityName == eventService.EntityName).toBeTruthy();
    }
  });

  test("Find event by Game", async () => {
    const event = await eventService.findEventByGame(game.id);
    expect(event).toBeTruthy();
  });

  test("Retrieve Current Events", async () => {
    const events = await eventService.getCurrentEvents(game.id);
    expect(events).toBeTruthy();
    expect(events.length).toBe(1);
    expect(events[0].status).toBe(EventStatus.STARTED);
  });

  test("Update an Event", async () => {
    const payload = {status: EventStatus.ENDED};
    await eventService.updateEvent(eventId, payload);
    const event = <Event> await eventService.findEventByGame(game.id);
    expect(event).toBeTruthy();
    expect(event.status).toBe(EventStatus.ENDED);
  });
});
