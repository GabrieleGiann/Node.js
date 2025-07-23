// src/server.ts

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import planetsRouter from "./routes/routes.js"; // <-- Importa il router dei pianeti

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Rotte API ---
// Usa il router dei pianeti per tutte le rotte che iniziano con /api/planets
app.use("/api/planets", planetsRouter); // <-- AGGIUNGI QUESTA RIGA

// Rotta di esempio per la homepage (già presente)
app.get("/", (req, res) => {
  res.send("Benvenuto nel mio server TypeScript!");
});

// Rotta di esempio /info (già presente)
app.get("/info", (req, res) => {
  res.json({
    message: "Informazioni sul server",
    port: PORT,
    environment: process.env.NODE_ENV,
    databaseHost: process.env.DB_HOST,
  });
});

// Avvia il Server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});
