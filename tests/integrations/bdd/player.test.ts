import {PlayerService} from "../../../src/services/entityServices";
import {getGameData, getUserData, initBddService} from "../setup";
import {
  EntityNotFoundError,
  ValidationDataError,
} from "../../../src/errors/bdd";
import {BddService} from "../../../src/services";
import {Game, Genders, Player, User} from "../../../src/entities";
import {
  castToPlayerData,
  PlayerData,
} from "../../../src/types/request/bodyData/PlayerData";

describe("Test Player Bdd Operations", ()=>{
  let bddService: BddService;
  let playerId: number;
  let user: User;
  let game: Game;
  let playerService:PlayerService;

  beforeAll(async ()=>{
    bddService = <BddService> await initBddService();
    playerService = bddService.playerService;
    user = await bddService.userService.createUser(getUserData("Player@Player", "PlayerUsername"));
    game = await bddService.gameService.createGame(getGameData(), user, "#PG62P");
  });

  afterAll(async ()=>{
    await bddService.playerService.deleteById(playerId);
    await bddService.gameService.deleteById(game.id);
    await bddService.userService.deleteById(user.id);
  });
  test("Create Player", async ()=>{
    const expectedData = {
      name: "PlayerPlayer",
      secret: "J'aime les Player",
      gender: "male",
      gameCode: game.code,
    };
    const playerData = castToPlayerData(expectedData);
    expect(playerData).toBeTruthy();

    const player = await playerService.createPlayer(<PlayerData>playerData, user, game);
    expect(player).toBeTruthy();
    expect(player.name).toBe(expectedData.name);
    expect(player.gender).toBe(Genders.MALE);
    playerId = player.id;
  });

  test("Create player Fails", async ()=>{
    const falseData = {
      name: "George",
      gender: "male",
      gameCode: game.code,
    };
    let playerData = castToPlayerData(falseData);
    expect(playerData).toBeFalsy();
    playerData = <PlayerData>playerData;

    try {
      await playerService.createPlayer(playerData, user, game);
    } catch (e) {
      expect(e instanceof ValidationDataError).toBeTruthy();
      const error = <ValidationDataError>e;
      expect(error.message == "Wrong Data").toBeTruthy();
      expect(error.entityName == playerService.EntityName).toBeTruthy();
    }
  });

  test("Find player by Id", async ()=>{
    const player = await playerService.findPlayerById(playerId);
    expect(player).toBeTruthy();
  });

  test("Find player by Id Fails", async ()=>{
    try {
      await playerService.findPlayerById(-1);
    } catch (e) {
      expect(e instanceof EntityNotFoundError).toBeTruthy();
      const error = <EntityNotFoundError>e;
      expect(error.entityName == playerService.EntityName).toBeTruthy();
    }
  });

  test("Find Player by User", async ()=>{
    const player = <Player> await playerService.findPlayerByUser(user.id);
    expect(player).toBeTruthy();
    expect(player.user.id).toBeTruthy();
    expect(player.user.id ).toBe(user.id);
    expect(player.game.id).toBeTruthy();
    expect(player.game.id).toBe(game.id);
  });

  test("Find Players by Game", async ()=>{
    const players = await playerService.findPlayersByGame(game.id);
    expect(players).toBeTruthy();
    expect(players.length).toBe(1);
    expect(players[0].id).toBe(playerId);
  });

  test("Retrieve Players' Secret", async ()=>{
    const secrets = await playerService.getPlayerSecrets(game.id);
    expect(secrets).toBeTruthy();
    expect(secrets.length).toBe(1);
    expect(secrets[0].secret).toBe("******");
  });

  test("Discover Player Secret", async ()=>{
    await playerService.secretDiscovered(playerId);
    const player = <Player> await playerService.findPlayerById(playerId);
    const secrets = await playerService.getPlayerSecrets(game.id);
    expect(player).toBeTruthy();
    expect(secrets).toBeTruthy();
    expect(player.secret).toBeTruthy();
    expect(secrets.length).toBe(1);
    expect(secrets.length).toBe(1);
    expect(secrets[0].secret).toBe(player.secret);
  });
});
