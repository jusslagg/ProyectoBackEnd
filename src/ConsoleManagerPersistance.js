import generateCode from "./utils.js";
import fs from "fs";

class ConsoleManager {
  constructor() {
    this.filePath = "./consoles.json"; // Archivo donde se guardan las consolas y juegos
  }

  // Obtener todas las consolas
  async getConsoles() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      if (data.length === 0) {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      console.log("Error al leer las consolas", error);
    }
  }

  // Obtener una consola por ID
  async getConsoleById(id) {
    try {
      const consoles = await this.getConsoles();
      const consoleFound = consoles.find((c) => c.id === id);
      if (!consoleFound) {
        console.log("Consola no encontrada");
        return null;
      }
      return consoleFound;
    } catch (error) {
      console.log("Error al leer la consola", error);
    }
  }

  // Crear una nueva consola
  async createConsole() {
    try {
      let consoles = await this.getConsoles();
      const newConsole = {
        id: generateCode(), // Genera un código único para la consola
        games: [], // Lista de juegos en la consola
      };
      consoles.push(newConsole); // Agregar la nueva consola a la lista
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(consoles, null, 2) // Guardamos el array actualizado de consolas en el archivo
      );
      console.log(`Consola creada con ID: ${newConsole.id}`);
      return newConsole;
    } catch (error) {
      console.log("Error al crear la consola", error);
    }
  }

  // Agregar un videojuego a la consola
  async addGameToConsole(consoleId, gameId) {
    try {
      const consoles = await this.getConsoles();
      const consoleFound = consoles.find((c) => c.id === consoleId);
      if (!consoleFound) {
        console.log("Consola no encontrada");
        return null;
      }

      // Simulamos que el "gameId" es el nombre del juego (puedes cambiar esto para usar IDs más complejos)
      const game = consoleFound.games.find((g) => g.id === gameId);
      if (game) {
        game.quantity++; // Si el juego ya está en la consola, incrementamos la cantidad
        console.log(`Se ha incrementado la cantidad del juego: ${gameId}`);
      } else {
        consoleFound.games.push({ id: gameId, quantity: 1 }); // Si el juego no está en la consola, lo agregamos
        console.log(`Juego agregado a la consola: ${gameId}`);
      }
      // Guardamos las consolas actualizadas en el archivo
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(consoles, null, 2)
      );
      return consoleFound;
    } catch (error) {
      console.log("Error al agregar el juego a la consola", error);
    }
  }
}

export default ConsoleManager;
