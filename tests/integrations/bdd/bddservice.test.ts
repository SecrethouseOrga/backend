import {BddService} from "../../../src/services";
import {initOrm, Logger} from "../setup";
import {MikroORM} from "@mikro-orm/core";
import {MySqlDriver} from "@mikro-orm/mysql";

let orm: MikroORM<MySqlDriver>;
describe("Create Bdd Service", ()=>{
  beforeAll(async ()=>{
    orm = await initOrm();
  });

  test("Connect To Bdd", async ()=>{
    const bddService = new BddService(Logger, orm);
    expect(bddService.EntityManager).toBeTruthy();
  });

  test("Create Entity Service", async ()=>{
    const bddService = new BddService(Logger, orm);
    expect(bddService.userService).toBeTruthy();
    expect(bddService.playerService).toBeTruthy();
    expect(bddService.gameService).toBeTruthy();
    expect(bddService.eventService).toBeTruthy();
    expect(bddService.buzzService).toBeTruthy();
    expect(bddService.roomGameService).toBeTruthy();
    expect(bddService.roomTypeService).toBeTruthy();
  });
});
