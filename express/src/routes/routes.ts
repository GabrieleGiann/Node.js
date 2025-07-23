import { Router, Request, Response } from "express";
import Joi from "joi";
interface Planet {
  id: number;
  name: string;
}

// Dummy database di pianeti
const planets: Planet[] = [
  { id: 1, name: "Mercurio" },
  { id: 2, name: "Venere" },
  { id: 3, name: "Terra" },
  { id: 4, name: "Marte" },
];

const Routes = Router();

// Schema di validazione Joi per un pianeta
const planetSchema = Joi.object({
  id: Joi.number().integer().min(1).optional(), // L'ID può essere opzionale per la creazione (sarà generato)
  name: Joi.string().min(3).required(), // Il nome è obbligatorio e deve avere almeno 3 caratteri
});

// GET /api/planets: Restituisce tutti i pianeti
Routes.get("/", (req: Request, res: Response) => {
  res.status(200).json(planets);
});

// GET /api/planets/:id: Restituisce un pianeta per ID
Routes.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const planet = planets.find((p) => p.id === id);

  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }
  res.status(200).json(planet);
});

// POST /api/planets: Crea un nuovo pianeta
Routes.post("/", (req: Request, res: Response) => {
  const { error, value } = planetSchema.validate(req.body);

  if (error) {
    // Se la validazione fallisce, restituisce un errore 400 con i dettagli
    return res.status(400).json({ msg: error.details[0].message });
  }

  // Genera un ID semplice (per un DB reale useresti un UUID o un ID autoincrementante)
  const newId =
    planets.length > 0 ? Math.max(...planets.map((p) => p.id)) + 1 : 1;
  const newPlanet: Planet = {
    id: newId,
    name: value.name,
  };

  planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created successfully" });
});

// PUT /api/planets/:id: Aggiorna un pianeta per ID
Routes.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  let planet = planets.find((p) => p.id === id);

  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  // Validazione del corpo della richiesta per l'aggiornamento
  // Usiamo .unknown(true) per permettere campi non definiti nello schema,
  // ma Joi.object().keys() è più specifico se si vuole validare solo i campi specifici.
  // Qui, il nome è l'unico campo che ci interessa aggiornare.
  const updateSchema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error, value } = updateSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  // Aggiorna il nome del pianeta
  planet.name = value.name;

  res.status(200).json({ msg: "Planet updated successfully" });
});

// DELETE /api/planets/:id: Elimina un pianeta per ID
Routes.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const initialLength = planets.length;

  // Trova l'indice del pianeta da eliminare
  const planetIndex = planets.findIndex((p) => p.id === id);

  if (planetIndex === -1) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  // Rimuovi il pianeta dall'array
  planets.splice(planetIndex, 1);

  res.status(200).json({ msg: "Planet deleted successfully" });
});

export default Routes;
