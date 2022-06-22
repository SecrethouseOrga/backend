import * as jwt from "jsonwebtoken";
import {UserPayload} from "../types/request";

export class TokenService {
  static expTime= "24h";
  static generateToken(userPayload:UserPayload): string {
    const key = process.env.SECRET_KEY;
    return jwt.sign(userPayload, key, {expiresIn: this.expTime});
  }

  static verifyToken(token: string):UserPayload | null {
    const key = process.env.SECRET_KEY;
    try {
      return <UserPayload>jwt.verify(token, key);
    } catch (error) {
      return null;
    }
  }
}

