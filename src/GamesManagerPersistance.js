import fs from "fs";
import generateCode from "./utils.js";

class GameManager {
  constructor() {
    this.filePath = "./games.json";
  }

  async getGames() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      if (data.length === 0) {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      console.log("Error al leer los videojuegos", error);
    }
  }

  async getGameById(id) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      const games = JSON.parse(data);
      const game = games.find((g) => g.id === Number(id)); // Buscando videojuego por ID
      if (!game) {
        console.log("Videojuego no encontrado");
        return null;
      }
      return game;
    } catch (error) {
      console.log("Error al leer el videojuego", error);
    }
  }

  async createGame(game) {
    try {
      let games = await this.getGames();
      let exist = games.find((g) => g.title === game.title);
      if (exist) {
        throw new Error("El videojuego ya existe");
      } else {
        const newGame = {
          id: Math.floor(Math.random() * Date.now()), // Generación de ID único
          code: generateCode(), // Generación de código único
          status: true,
          ...game, // Desestructuración del videojuego
        };
        games.push(newGame);
        await fs.promises.writeFile(
          this.filePath,
          JSON.stringify(games, null, 2) // Escribir los datos en el archivo
        );
        return newGame;
      }
    } catch (error) {
      console.log("Error al crear el videojuego", error);
      return null;
    }
  }

  async updateGame(id, game) {
    try {
      const games = await this.getGames();
      const index = games.findIndex((g) => g.id === Number(id)); // Buscar el índice del videojuego
      if (index === -1) {
        console.log("Videojuego no encontrado");
        return null;
      }
      games[index] = { ...games[index], ...game }; // Actualizar los datos del videojuego
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(games, null, 2) // Escribir los cambios en el archivo
      );
      console.log("Videojuego actualizado:", games[index]);
      return games[index];
    } catch (error) {
      console.log("Error al actualizar el videojuego", error);
      return null;
    }
  }

  async deleteGame(id) {
    try {
      const games = await this.getGames();
      const index = games.findIndex((g) => g.id === Number(id)); // Buscar el índice del videojuego
      if (index === -1) {
        console.log("Videojuego no encontrado");
        return;
      }
      games.splice(index, 1); // Eliminar el videojuego de la lista
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(games, null, 2) // Escribir los datos actualizados en el archivo
      );
      console.log("Videojuego eliminado");
    } catch (error) {
      console.log("Error al eliminar el videojuego", error);
    }
  }
}

export default GameManager;
