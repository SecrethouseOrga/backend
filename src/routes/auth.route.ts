import {Router} from "express";
import {BddService} from "../services";
import {authVerification, returnData, tokenGeneration} from "../middlewares";
import {AuthController} from "../controllers";


export default function(bddService:BddService): Router {
  const controller = new AuthController(bddService);
  const router = Router();

  router.post("/register", controller.registerUser.bind(controller), tokenGeneration, returnData);

  router.post("/login", controller.logUser.bind(controller), tokenGeneration, returnData);

  router.get("/testtoken", authVerification, controller.testToken.bind(controller), returnData);

  return router;
}
