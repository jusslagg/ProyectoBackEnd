import { Router } from "express";
import GameManager from "../GamesManagerPersistance.js";

const gameManager = new GameManager(); // Instanciamos GameManager

const router = Router();

// middleware para logs
router.use((req, res, next) => {
  console.log(`Logs de juegos: ${req.method} ${req.path} - ${new Date()}`);
  next();
});

router.get("/", async (req, res) => {
  const games = await gameManager.getGames();
  res.status(200).json({
    message: "Juegos obtenidos con éxito",
    games,
  });
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10); // Convertimos `id` a número
  const game = await gameManager.getGameById(id);

  if (!game) {
    return res.status(404).json({ error: "Juego no encontrado" });
  }

  res.status(200).json({
    message: "Juego obtenido con éxito",
    game, // Cambiamos "product" por "game"
  });
});

router.post("/create", async (req, res) => {
  const { title, description, category, price, stock } = req.body;
  const newGame = await gameManager.createGame({
    title,
    description,
    category,
    price,
    stock,
  });

  if (!newGame) {
    return res.status(400).json({ error: "Error al crear el juego" });
  }

  res.status(201).send({ message: "Juego creado con éxito", game: newGame });
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedGame = await gameManager.updateGame(id, req.body);

  if (!updatedGame) {
    return res.status(404).json({ error: "Juego no encontrado" });
  }

  res.status(200).json({
    message: "Juego actualizado con éxito",
    game: updatedGame,
  });
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await gameManager.deleteGame(id);
  res.status(200).json({ message: "Juego eliminado con éxito" });
});

export default router;
