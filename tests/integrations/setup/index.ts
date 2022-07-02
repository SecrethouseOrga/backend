export * from "./route.setup";
export * from "./bdd.setup";
import {PlayerData} from "../../../src/types/request/bodyData/PlayerData";
import {
  EventData,
  GameData, RoomTypeData,
  UserData,
} from "../../../src/types/request/bodyData";

export function getPlayerData(name:string, secret:string, gameCode:string): PlayerData {
  return <PlayerData>{secret: secret, name: name, gender: "male", gameCode: gameCode};
}

export function getUserData(email:string, username:string): UserData {
  return <UserData>{email: email, username: username, password: "!@pass"};
}

export function getGameData(): GameData {
  return <GameData>{maxPlayers: 2, eventIntervalQty: 100, eliminationDelayQty: 100,
    eliminationDelayUnity: "h", eventIntervalUnity: "h"};
}

export function getEventData(gameId:number): EventData {
  return <EventData>{content: "Je suis un event", gameId: gameId};
}

export function getRoomTypeData(name:string): RoomTypeData {
  return <RoomTypeData>{name: name, isSecret: false};
}


