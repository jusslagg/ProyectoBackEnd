import express from "express";

import consoleRouter from "./router/consoleRouter.js"; //
import gamesRouter from "./router/gamesRouter.js"; //

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("Servidor levantado en el puerto 8080");
});

// Espacio para rutas
app.use("/api/games", gamesRouter); // la ruta es para juegos
app.use("/api/consoles", consoleRouter); // la ruta es para consolas
