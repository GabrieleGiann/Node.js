import { Request, Response } from "express";
import Joi from "joi";
import { planets, Planet } from "../data/planets.js";

const planetSchema = Joi.object({
  id: Joi.number().integer().min(1).optional(),
  name: Joi.string().min(3).required(),
});

export const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

export const getOneById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const planet = planets.find((p) => p.id === id);

  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }
  res.status(200).json(planet);
};

export const create = (req: Request, res: Response) => {
  const { error, value } = planetSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const newId =
    planets.length > 0 ? Math.max(...planets.map((p) => p.id)) + 1 : 1;
  const newPlanet: Planet = {
    id: newId,
    name: value.name,
  };

  planets.push(newPlanet);

  res.status(201).json({ msg: "Planet created successfully" });
};

export const updateById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  const updateSchema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error, value } = updateSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const planetToUpdate = planets.find((p) => p.id === id);

  if (!planetToUpdate) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  planetToUpdate.name = value.name;

  res.status(200).json({ msg: "Planet updated successfully" });
};

export const deleteById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  const planetIndex = planets.findIndex((p) => p.id === id);

  if (planetIndex === -1) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  planets.splice(planetIndex, 1);

  res.status(200).json({ msg: "Planet deleted successfully" });
};
