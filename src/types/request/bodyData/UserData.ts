export interface UserData {
    username: string;
    email: string;
    password: string;
}

export function castToUserData(value:any): UserData|null {
  const castedData = <UserData> value;
  return (isUserData(castedData))? castedData : null;
}

function isUserData(data: UserData):data is UserData {
  return data.username != undefined &&
    data.email != undefined &&
    data.password != undefined;
}
