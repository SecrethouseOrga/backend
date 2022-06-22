import {EntityHandler} from "./EntityHandler";
import {EntityManager} from "@mikro-orm/mysql";
import {User, UserRole} from "../entities";
import {UserData} from "../../types/request/bodyData";


export class UserHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, User);
  }

  async createUser(payload:UserData, role: UserRole = UserRole.VIEWER) {
    const user = new User(payload, role);
    this.repository.persist(user);
    await this.repository.flush();
    return user;
  }

  async findUserById(id:number) {
    return await this.repository.findOneOrFail({id: id});
  }

  async findUserByEmail(email:string) {
    return await this.repository.findOneOrFail({email: email});
  }

  async findUserByUsername(username:string) {
    return await this.repository.findOneOrFail({username: username});
  }
}
