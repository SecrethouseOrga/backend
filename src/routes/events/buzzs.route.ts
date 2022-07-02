import {
  authVerification,
  checkId,
  objectCreated,
  returnData,
} from "../../middlewares";
import {Router} from "express";
import {BddService} from "../../services";
import {BuzzController} from "../../controllers";

export default function(bddService:BddService): Router {
  const controller = new BuzzController(bddService);
  const router = Router();

  router.post("/", authVerification, controller.createBuzz.bind(controller), objectCreated);

  router.get("/:id", checkId, controller.getBuzz.bind(controller), returnData);

  router.put("/:id", checkId, controller.updateBuzz.bind(controller), objectCreated);

  return router;
}

