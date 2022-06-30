export type RoomTypeData = {
    name: string;
    isSecret: boolean;
}

export function castToRoomTypeData(value: any):RoomTypeData|null {
  const castedData = <RoomTypeData> value;
  return (isRoomTypeData(castedData))? castedData : null;
}
function isRoomTypeData(data:RoomTypeData):data is RoomTypeData {
  return data.name != undefined && data.isSecret != undefined;
}
