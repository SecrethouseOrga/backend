import {BddService} from "../../../src/services";
import {RoomType,} from "../../../src/entities";
import {initBddService,} from "../setup";
import {RoomTypeService,} from "../../../src/services/entityServices";
import {castToRoomTypeData, RoomTypeData} from "../../../src/types/request/bodyData";

describe("Test event Bdd Operations", ()=> {
  let bddService: BddService;
  let roomTypeService:RoomTypeService;
  let roomTypeId: number;
  beforeAll(async ()=>{
    bddService = <BddService> await initBddService();
    roomTypeService = bddService.roomTypeService;
  });

  afterAll(async ()=>{
    await bddService.roomTypeService.deleteById(roomTypeId);
  });

  test("Create RoomType", async () => {
    const expectedData = {
      name: "Cuisine",
      isSecret: false,
    };
    const roomTypeData = castToRoomTypeData(expectedData);
    expect(roomTypeData).toBeTruthy();
    const roomType = <RoomType> await roomTypeService.createRoomType(<RoomTypeData>roomTypeData);
    expect(roomType).toBeTruthy();
    expect(roomType.name).toBe(expectedData.name);
    roomTypeId = roomType.id;
  });

  test("Find All RoomType", async () => {
    const roomTypes = await roomTypeService.findAll();
    expect(roomTypes).toBeTruthy();
    expect(roomTypes.length).toBe(1);
  });

  test("Find RoomType by Id", async () => {
    const roomType = await roomTypeService.findRoomTypeById(roomTypeId);
    expect(roomType).toBeTruthy();
    expect(roomType.id).toBe(roomTypeId);
  });
});
