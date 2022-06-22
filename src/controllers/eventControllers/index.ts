import {Router} from "express";
import {buzzController} from "./buzzController";
import {checkId} from "../commonMiddlewares/paramMiddleware";
import {BddService} from "../../services/BddService";
import {BadRequestError} from "../../errors";

const router = Router();
router.put("/:id", checkId, async function(req, res, next) {
  const eventId = +req.params.id;
  try {
    const event = await BddService.eventHandler.updateEvent(eventId, req.body);
    return res.status(200).send(event);
  } catch (e) {
    throw new BadRequestError("Event could not be updated");
  }
});
router.use("/buzzs", buzzController);
export {router as eventController};
