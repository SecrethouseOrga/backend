export type BuzzData = {
    secret: string;
    targetId: number;
}

export function castToBuzzData(value: any):BuzzData|null {
  const castedData = <BuzzData> value;
  return (isBuzzData(castedData))? castedData : null;
}
function isBuzzData(data:BuzzData):data is BuzzData {
  return data.targetId != undefined && data.secret != undefined;
}
