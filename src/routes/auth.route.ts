import {Router} from "express";
import {BddService} from "../services";
import {
  authVerification,
  objectCreated,
  returnData,
  tokenGeneration,
} from "../middlewares";
import {AuthController} from "../controllers";


export default function(bddService:BddService): Router {
  const controller = new AuthController(bddService);
  const router = Router();

  router.post("/register", controller.registerUser.bind(controller), tokenGeneration, objectCreated);

  router.post("/login", controller.logUser.bind(controller), tokenGeneration, objectCreated);

  router.get("/testtoken", authVerification, controller.testToken.bind(controller), returnData);

  return router;
}
