export interface RoomData {
    name: string;
    isSecret: boolean;
}

export function castToRoomData(value: any):RoomData|null {
  const castedData = <RoomData> value;
  return (isRoomData(castedData))? castedData : null;
}
function isRoomData(data:RoomData):data is RoomData {
  return data.name != undefined && data.isSecret != undefined;
}
