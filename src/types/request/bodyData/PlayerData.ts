export type PlayerData = {
    name: string;
    secret: string;
    gender: string;
}

export function castToPlayerData(value: any):PlayerData|null {
  const castedData = <PlayerData> value;
  return (isPlayerData(castedData))? castedData : null;
}
function isPlayerData(data:PlayerData):data is PlayerData {
  return data.name != undefined && data.secret != undefined &&
    data.gender != undefined;
}
