import {BddService} from "../../../src/services";
import {
  Buzz, BuzzStatus,
  Event,
  EventTypes,
  Game,
  Player,
  User,
} from "../../../src/entities";
import {
  getEventData,
  getGameData,
  getPlayerData,
  getUserData,
  initBddService,
} from "../setup";
import {castToBuzzData, BuzzData} from "../../../src/types/request/bodyData";
import {
  EntityNotFoundError,
  ValidationDataError,
} from "../../../src/errors/bdd";
import {BuzzService} from "../../../src/services/entityServices";

describe("Test event Bdd Operations", ()=> {
  let bddService: BddService;
  let buzzService:BuzzService;
  let game: Game;
  let player1: Player;
  let player2: Player;
  let user1: User;
  let user2: User;
  let event: Event;
  let buzzId: number;
  const eventType= EventTypes.BUZZ;
  beforeAll(async ()=>{
    bddService = <BddService> await initBddService();
    const code = "#BG62B";
    user1 = await bddService.userService.createUser(getUserData("Buzz@Buzz1", "Buzz1Username"));
    user2 = await bddService.userService.createUser(getUserData("Buzz@Buzz2", "Buzz2Username"));
    game = await bddService.gameService.createGame(getGameData(), user1, code);
    player1 = await bddService.playerService.createPlayer(getPlayerData("BuzzPlayer", "Des Buzz1 secretes", code), user1, game);
    player2 = await bddService.playerService.createPlayer(getPlayerData("BuzzPlayer", "Des Buzz2 secrets 2", code), user2, game);
    event = await bddService.eventService.createEvent(getEventData(game.id), player1, game, eventType);
    buzzService = bddService.buzzService;
  });

  afterAll(async ()=>{
    await bddService.buzzService.deleteById(buzzId);
    await bddService.eventService.deleteById(event.id);
    await bddService.playerService.deleteById(player1.id);
    await bddService.playerService.deleteById(player2.id);
    await bddService.gameService.deleteById(game.id);
    await bddService.userService.deleteById(user1.id);
    await bddService.userService.deleteById(user2.id);
  });

  test("Create Buzz Event", async () => {
    const expectedData = {
      secret: "Des aliments secrets",
      targetId: player2.id,
    };
    const buzzData = castToBuzzData(expectedData);
    expect(buzzData).toBeTruthy();

    const buzz = <Buzz> await buzzService.createBuzz(<BuzzData>buzzData, player1, player2, event);
    expect(buzz).toBeTruthy();
    expect(buzz.event.id).toBe(event.id);
    expect(buzz.buzzer.id).toBe(event.player.id);
    expect(buzz.target.id).toBe(expectedData.targetId);
    expect(buzz.target.id).toBe(expectedData.targetId);
    expect(buzz.secret).toBe(expectedData.secret);
    buzzId = buzz.id;
  });

  test("Create Buzz Fails", async () => {
    const falseData = {
      targetId: player2.id,
    };
    let buzzData = castToBuzzData(falseData);
    expect(buzzData).toBeFalsy();
    buzzData = <BuzzData>buzzData;

    try {
      await buzzService.createBuzz(buzzData, player1, player2, event);
    } catch (e) {
      expect(e instanceof ValidationDataError).toBeTruthy();
      const error = <ValidationDataError>e;
      expect(error.message == "Wrong Data").toBeTruthy();
      expect(error.entityName == buzzService.EntityName).toBeTruthy();
    }
  });

  test("Find Buzz by Id", async () => {
    const buzz = await buzzService.findBuzzById(buzzId);
    expect(buzz).toBeTruthy();
    expect(buzz.id).toBe(buzzId);
  });

  test("Find Buzz by Id Fails", async () => {
    try {
      await buzzService.findBuzzById(-1);
    } catch (e) {
      expect(e instanceof EntityNotFoundError).toBeTruthy();
      const error = <EntityNotFoundError>e;
      expect(error.entityName == buzzService.EntityName).toBeTruthy();
    }
  });

  test("Update a Buzz", async () => {
    const payload = {status: BuzzStatus.CORRECT};
    await buzzService.update(payload, buzzId);
    const buzz = <Buzz> await buzzService.findBuzzById(buzzId);
    expect(buzz).toBeTruthy();
    expect(buzz.status).toBe(BuzzStatus.CORRECT);
  });
});
