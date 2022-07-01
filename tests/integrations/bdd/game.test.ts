import {BddService} from "../../../src/services";
import {getUserData, initBddService} from "../setup";
import {GameService} from "../../../src/services/entityServices";
import {User} from "../../../src/entities";
import {
  castToGameData,
  GameData,
} from "../../../src/types/request/bodyData";
import {
  EntityNotFoundError,
  ValidationDataError,
} from "../../../src/errors/bdd";

describe("Test Game Bdd Operations", ()=>{
  let bddService: BddService;
  let gameService:GameService;
  let user: User;
  let gameId:number;
  const gameCode= "#15478";
  beforeAll(async ()=>{
    bddService = <BddService> await initBddService();
    user = await bddService.userService.createUser(getUserData("aa@a2a", "hello2"));
    gameService = bddService.gameService;
  });

  afterAll(async ()=>{
    await bddService.gameService.deleteById(gameId);
    await bddService.userService.deleteById(user.id);
  });

  test("Create Game", async ()=>{
    const expectedData = {
      maxPlayers: 2,
      eventIntervalQty: 400,
      eliminationDelayQty: 60,
    };
    const gameData = castToGameData(expectedData);
    expect(gameData).toBeTruthy();

    const game = await gameService.createGame(<GameData>gameData, user, gameCode);
    expect(game).toBeTruthy();
    expect(game.maxPlayers).toBe(expectedData.maxPlayers);
    gameId = game.id;
  });

  test("Create Game Fails", async ()=>{
    const falseData = {
      maxPlayers: 2,
      eventIntervalQty: "400",
    };
    let gameData = castToGameData(falseData);
    expect(gameData).toBeFalsy();
    gameData = <GameData>gameData;

    try {
      await gameService.createGame(gameData, user, gameCode);
    } catch (e) {
      expect(e instanceof ValidationDataError).toBeTruthy();
      const error = <ValidationDataError>e;
      expect(error.message == "Wrong Data").toBeTruthy();
      expect(error.entityName == gameService.EntityName).toBeTruthy();
    }
  });

  test("Find Game by Id", async ()=>{
    const game = await gameService.findGameById(gameId);
    expect(game).toBeTruthy();
  });

  test("Find Game by Id Fails", async ()=>{
    try {
      await gameService.findGameById(-1);
    } catch (e) {
      expect(e instanceof EntityNotFoundError).toBeTruthy();
      const error = <EntityNotFoundError>e;
      expect(error.entityName == gameService.EntityName).toBeTruthy();
    }
  });

  test("Find Game by Code", async ()=>{
    const game = await gameService.findGameByCode(gameCode);
    expect(game).toBeTruthy();
    expect(game.code).toBe(gameCode);
  });
});
