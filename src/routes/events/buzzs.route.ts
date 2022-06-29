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

  router.post("/", authVerification, controller.createBuzz, objectCreated);

  router.get("/:id", checkId, controller.getBuzz, returnData);

  router.put("/:id", checkId, controller.updateBuzz, objectCreated);

  return router;
}

