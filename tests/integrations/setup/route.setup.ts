import {MockExpressMiddleware} from "../../../src/types/test";
import {ResponsePayload, UserPayload} from "../../../src/types/request";

export function getMockMiddleware(){
  return <MockExpressMiddleware>{
    mockRequest: {
      currentUser: getUserPayload(),
      resPayload: getResponsePayload(),
      headers:{token:""},
      params:{},
      body:{},
      method:"Get",
      originalUrl:"/dummyUrl"
    },
    mockResponse: {},
    mockNext: jest.fn(),
  }
}

export function getToken(){

}

export function getUserPayload():UserPayload{
  return <UserPayload>{id:1,email:"dummy@email"};
}

export function getResponsePayload():ResponsePayload{
  return <ResponsePayload> {status: 200, dataToSend: ""}
}
