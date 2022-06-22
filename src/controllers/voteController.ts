import {Router} from "express";
import {Event, Player, User, Vote} from "../bdd/entities";
import {BadRequestError} from "../errors";
import {BddService} from "../services/BddService";
import {authVerification} from "./commonMiddlewares/authMiddlewares";

const router = Router();

router.post("/create", authVerification, async function(req, res, next) {
  const user = <User> await BddService.userHandler.findUserById(req.currentUser.id);
  const target = <Player> await BddService.playerHandler.findPlayerById(req.body.targetId);

  if (user === null) {
    throw new BadRequestError("Invalid User Data");
  }

  if (target === null) {
    throw new BadRequestError("Invalid Player Data");
  }

  const event = <Event> await BddService.eventHandler.findEventById(req.body.eventId);

  if (event === null) {
    throw new BadRequestError("Invalid Event Data");
  }

  const vote = await BddService.voteHandler.createVote(user, target, event);

  if (vote != null) {
    return res.status(200).send(vote);
  } else {
    throw new BadRequestError("Invalid Vote Data");
  }
});

router.get("/vote/:id", async function(req, res, next) {
  const idVote: number = +req.params.id;

  if (isNaN(idVote) || idVote === 0) {
    throw new BadRequestError("Nomination id not valid");
  }

  const vote = <Vote> await BddService.voteHandler.findVoteById(idVote);
  return res.status(200).send(vote);
});

export {router as voteController};
