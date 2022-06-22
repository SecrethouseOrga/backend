import {Entity, Enum, PrimaryKey, Property, Unique} from "@mikro-orm/core";
import {UserData} from "../../types/request/bodyData";

@Entity()
export class User {
    @PrimaryKey()
      id!: number;

    @Property()
    @Unique()
      username!: string;

    @Property()
    @Unique()
      email!: string;

    @Property()
      password!: string;

    @Property()
      profilePic?: string;

    @Enum(()=> UserRole)
      role : UserRole = UserRole.VIEWER;

    constructor(userData: UserData, role: UserRole) {
      this.email = userData.email;
      this.username = userData.username;
      this.password = userData.password;
      this.role = role;
    }

    static castToUserRole(value: string): UserRole {
      let role: UserRole = UserRole.NONE;
      try {
        const roleName: keyof typeof UserRole = value as keyof typeof UserRole;
        role = UserRole[roleName];
      } catch (e) {
        console.log(e);
        return UserRole.NONE;
      }
      return role;
    }
}


export enum UserRole{
    "NONE"= "none",
    "VIEWER"= "viewer",
    "PLAYER"= "player",
}
