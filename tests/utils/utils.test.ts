import {getUserPayload} from "../integrations/setup";
import {generateGameCode, TokenUtils} from "../../src/utils";
import {UserPayload} from "../../src/types/request";
import {config} from "dotenv";

describe("Test token utils", ()=>{
  beforeAll(()=>{
    config();
  })

  test("Generate a Token", ()=>{
    const userPayload = getUserPayload();
    const token = TokenUtils.generateToken(userPayload);
    expect(token).toBeTruthy();
  })

  test("Verify Token", ()=>{
    const userPayload = getUserPayload();
    const token = TokenUtils.generateToken(userPayload);
    const result = <UserPayload>TokenUtils.verifyToken(token);
    expect(result.id).toBe(userPayload.id);
    expect(result.email).toBe(userPayload.email);
  })

  test("Verify Token Fail", ()=>{
    const token = "";
    const result = TokenUtils.verifyToken(token);
    expect(result).toBeNull();
  })

  test("Generate Game Code", ()=>{
    const code = generateGameCode();
    expect(code).toBeTruthy();
  })
})
