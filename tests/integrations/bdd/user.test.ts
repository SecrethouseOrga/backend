import {UserService} from "../../../src/services/entityServices";
import {getEntityServiceData, initOrm} from "../setup";
import {User} from "../../../src/entities";
import {castToUserData, UserData} from "../../../src/types/request/bodyData";
import {
  EntityNotFoundError,
  ValidationDataError,
} from "../../../src/errors/bdd";
import {EntityManager} from "@mikro-orm/mysql";

let userService: UserService;
let userId: number;
let userEmail: string;
beforeAll(async ()=>{
  const orm = await initOrm();
  const em = orm.em as EntityManager;
  const entityData = getEntityServiceData(em, User);
  userService = new UserService(entityData);
});

afterAll(async ()=>{
  await userService.deleteById(userId);
});

describe("Test User Bdd Operation", ()=>{
  test("Create User", async ()=>{
    const expectedData = {username: "alb", email: "aa@aa.com", password: "!pass"};
    const userData = castToUserData(expectedData);
    expect(userData).toBeTruthy();

    const user = await userService.createUser(<UserData>userData);
    expect(user).toBeTruthy();
    expect(user.email).toBe(expectedData.email);
    userId = user.id;
    userEmail = user.email;
  });

  test("Create user Fails", async ()=>{
    const falseData = {username: "alb", email: "aa@aa.com"};
    let userData = castToUserData(falseData);
    expect(userData).toBeFalsy();
    userData = <UserData>userData;

    try {
      await userService.createUser(userData);
    } catch (e) {
      expect(e instanceof ValidationDataError).toBeTruthy();
      const error = <ValidationDataError>e;
      expect(error.message == "Wrong Data").toBeTruthy();
      expect(error.entityName == userService.EntityName).toBeTruthy();
    }
  });

  test("Find User by Id", async ()=>{
    const user = await userService.findUserById(userId);
    expect(user).toBeTruthy();
  });

  test("Find User by Id Fails", async ()=>{
    try {
      await userService.findUserById(-1);
    } catch (e) {
      expect(e instanceof EntityNotFoundError).toBeTruthy();
      const error = <EntityNotFoundError>e;
      expect(error.entityName == userService.EntityName).toBeTruthy();
    }
  });

  test("Find User by Email", async ()=>{
    const user = await userService.findUserByEmail(userEmail);
    expect(user).toBeTruthy();
  });
});
