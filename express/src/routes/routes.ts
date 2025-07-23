import { Router } from "express";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "../controllers/Planets.js";

const planetsRouter = Router();

planetsRouter.get("/", getAll);

planetsRouter.get("/:id", getOneById);

planetsRouter.post("/", create);

planetsRouter.put("/:id", updateById);

planetsRouter.delete("/:id", deleteById);

export default planetsRouter;
