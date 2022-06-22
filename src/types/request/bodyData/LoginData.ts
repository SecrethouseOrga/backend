export interface LoginData {
    email: string;
    password: string;
}

export function castToLoginData(value: any):LoginData|null {
  const castedData = <LoginData> value;
  return (isLoginData(castedData))? castedData : null;
}
function isLoginData(data:LoginData):data is LoginData {
  return data.email != undefined && data.password != undefined;
}
