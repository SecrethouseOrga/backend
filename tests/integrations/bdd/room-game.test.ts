import {BddService} from "../../../src/services";
import {
  RoomGame,
  Game,
  Player,
  User, RoomType,
} from "../../../src/entities";
import {
  getGameData,
  getPlayerData, getRoomTypeData,
  getUserData,
  initBddService,
} from "../setup";
import {RoomGameService} from "../../../src/services/entityServices";

describe("Test event Bdd Operations", ()=> {
  let bddService: BddService;
  let roomGameService:RoomGameService;
  let game: Game;
  let player: Player;
  let user: User;
  let roomType: RoomType;
  let roomGameId: number;
  beforeAll(async ()=>{
    bddService = <BddService> await initBddService();
    const code = "#RGG62RG";
    user = await bddService.userService.createUser(getUserData("roomGame@roomGame", "roomGame"));
    game = await bddService.gameService.createGame(getGameData(), user, code);
    roomType = await bddService.roomTypeService.createRoomType(getRoomTypeData("CuisineRoomGame"));
    player = await bddService.playerService.createPlayer(getPlayerData("PlayerRoomGame", "Des RoomGame secretes", code), user, game);
    roomGameService = bddService.roomGameService;
  });

  afterAll(async ()=>{
    await bddService.roomGameService.deleteById(roomGameId);
    await bddService.roomTypeService.deleteById(roomType.id);
    await bddService.playerService.deleteById(player.id);
    await bddService.gameService.deleteById(game.id);
    await bddService.userService.deleteById(user.id);
  });

  test("Create RoomGame", async () => {
    const roomGame = <RoomGame> await roomGameService.createRoomGame(roomType, game);
    expect(roomGame).toBeTruthy();
    expect(roomGame.game.id).toBe(game.id);
    expect(roomGame.room.id).toBe(roomType.id);
    roomGameId = roomGame.id;
  });

  test("Find Rooms by Game", async () => {
    const roomGames = await roomGameService.findRoomsByGame(game.id);
    expect(roomGames).toBeTruthy();
    expect(roomGames.length).toBe(1);
  });
});
