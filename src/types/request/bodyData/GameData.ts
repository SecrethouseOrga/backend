export type GameData = {
    maxPlayers: number;
    eventIntervalQty: number;
    eliminationDelayQty: number;
}

export function castToGameData(value: any):GameData|null {
  const castedData = <GameData> value;
  return (isGameData(castedData))? castedData : null;
}
function isGameData(data:GameData):data is GameData {
  return data.maxPlayers != undefined && data.eventIntervalQty != undefined &&
    data.eliminationDelayQty != undefined
}
