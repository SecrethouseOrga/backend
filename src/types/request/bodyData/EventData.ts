export type EventData = {
    content: string;
    gameId: number;
}

export function castToEventData(value: any):EventData|null {
  const castedData = <EventData> value;
  return (isEventData(castedData))? castedData : null;
}
function isEventData(data:EventData):data is EventData {
  return data.content != undefined && data.gameId != undefined;
}
