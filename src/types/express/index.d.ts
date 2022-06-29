import {ResponsePayload, UserPayload} from "../request";

declare global{
    namespace Express{
        interface Request{
            currentUser:UserPayload;
            resPayload:ResponsePayload;
        }
    }
}

/* declare module "express"{
    interface Request{
        user?: UserPayload;
    }
} */
