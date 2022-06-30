import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {RoomTypeData} from "../types/request/bodyData";

@Entity()
export class RoomType {
    @PrimaryKey()
      id!: number;

    @Property()
      name!: string;

    @Property()
      isSecret!: boolean;

    constructor(roomData: RoomTypeData) {
      this.name = roomData.name;
      this.isSecret = roomData.isSecret;
    }
}
