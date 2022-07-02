import {Options} from "@mikro-orm/core";
import {
  Buzz,
  Event,
  Game,
  Player,
  RoomGame,
  RoomType,
  User,
} from "../../src/entities";
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";

const options = function(): Options {
  return {
    entities: [User, Game, RoomType, RoomGame, Player, Event, Buzz],
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    metadataProvider: TsMorphMetadataProvider,
    port: Number(process.env.DB_PORT),
    allowGlobalContext: true,
    type: "postgresql",
    validate: true,
    driverOptions: {
      connection: {ssl: {rejectUnauthorized: false}},
    },
  };
};

export default options;
