import {Router} from "express";
import {buzzController} from "./buzzController";
import {BddService} from "../../services/BddService";
import {objectCreated, checkId} from "../commonMiddlewares";
import {ErrorService} from "../../services/ErrorService";

const router = Router();
router.put("/:id", checkId, async function(req, res, next) {
  const eventId = +req.params.id;
  try {
    req.dataToSend = await BddService.eventHandler.updateEvent(eventId, req.body);
  } catch (e) {
    throw ErrorService.handleError(e);
  }
  next();
}, objectCreated);
router.use("/buzzs", buzzController);
export {router as eventController};
