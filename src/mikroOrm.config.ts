import {Buzz, Event, Game, Player, Room, RoomGame, User} from "./entities";
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";
import {Options} from "@mikro-orm/core";

const options = function(): Options {
  return {
    entities: [User, Game, Room, RoomGame, Player, Event, Buzz],
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    metadataProvider: TsMorphMetadataProvider,
    port: Number(process.env.DB_PORT),
    type: "mysql",
    validate: true,
  };
};

export default options;
