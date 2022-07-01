import {EntityService} from "./EntityService";
import {User, UserRole} from "../../entities";
import {UserData} from "../../types/request/bodyData";
import {EntityServiceData} from "../../types/api/services";
import {BddOperation} from "../../types/api/enums";


export class UserService extends EntityService {
  constructor(data: EntityServiceData) {
    super(data, "User");
  }

  async createUser(payload:UserData, role: UserRole = UserRole.VIEWER) {
    try {
      const user = new User(payload, role);
      this.repository.persist(user);
      await this.repository.flush();
      return user;
    } catch (e) {
      throw this.handleOperationError(BddOperation.CREATE, e);
    }
  }

  async findUserById(id:number) {
    try {
      return await this.repository.findOneOrFail({id: id});
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }

  async findUserByEmail(email:string) {
    try {
      return await this.repository.findOneOrFail({email: email});
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }
}
