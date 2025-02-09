import { Router } from "express";

import ConsoleManager from "../ConsoleManagerPersistance.js"; //

const consoleManager = new ConsoleManager(); //

const router = Router();

router.get("/", async (req, res) => {
  const consoles = await consoleManager.getConsoles(); //
  res.status(200).json({ message: "Consolas obtenidas", consoles });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const console = await consoleManager.getConsoleById(id); //
  if (!console) {
    return res.status(404).json({ error: "Consola no encontrada" }); //
  }
  res.status(200).json({ message: "Consola obtenida", console });
});

router.post("/create", async (req, res) => {
  const console = await consoleManager.createConsole(); //
  res.status(201).json({ message: "Consola creada", console });
});

router.post("/:id/game/:id_game", async (req, res) => {
  const consoleId = req.params.id;
  const gameId = parseInt(req.params.id_game, 10); //
  const console = await consoleManager.addGameToConsole(consoleId, gameId); //
  if (!console) {
    return res.status(404).json({ error: "Consola no encontrada" }); //
  }
  res
    .status(200)
    .json({ message: "Videojuego agregado a la consola", console }); //
});

export default router;
