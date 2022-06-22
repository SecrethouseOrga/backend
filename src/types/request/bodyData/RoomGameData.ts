export interface RoomGameData {
    isLocked: boolean;
}

export function castToRoomGameData(value:any): RoomGameData|null {
  const castedData = <RoomGameData> value;
  return (isRoomGameData(castedData))? castedData : null;
}

function isRoomGameData(data: RoomGameData):data is RoomGameData {
  return data.isLocked != undefined;
}
