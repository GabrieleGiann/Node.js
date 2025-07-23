import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import planetsRouter from "./routes/routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/planets", planetsRouter);

app.get("/", (req, res) => {
  res.send("Benvenuto nel mio server TypeScript!");
});

app.get("/info", (req, res) => {
  res.json({
    message: "Informazioni sul server",
    port: PORT,
    environment: process.env.NODE_ENV,
    databaseHost: process.env.DB_HOST,
  });
});

app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
});
