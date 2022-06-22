import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {RoomData} from "../../types/request/bodyData";

@Entity()
export class Room {
    @PrimaryKey()
      id!: number;

    @Property()
      name!: string;

    @Property()
      isSecret!: boolean;

    constructor(roomData: RoomData) {
      this.name = roomData.name;
      this.isSecret = roomData.isSecret;
    }
}
