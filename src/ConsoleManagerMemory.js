import generateCode from "./utils.js"; // Asegúrate de tener el archivo de utilidades adecuado

class ConsoleManager {
  constructor() {
    this.consoles = []; // Lista de consolas
  }

  // Obtener todas las consolas
  async getConsoles() {
    try {
      console.log("Obteniendo todas las consolas...");
      return this.consoles;
    } catch (error) {
      console.log("Error al leer las consolas", error);
    }
  }

  // Crear una nueva consola
  async createConsole() {
    try {
      const newConsole = {
        id: generateCode(), // Genera un código único para la consola
        games: [], // Lista de juegos en la consola
      };
      this.consoles.push(newConsole); // Agregar la nueva consola a la lista
      console.log(`Consola creada con ID: ${newConsole.id}`);
      return newConsole;
    } catch (error) {
      console.log("Error al crear la consola", error);
    }
  }

  // Obtener una consola por ID
  async getConsoleById(id) {
    try {
      const consoleFound = this.consoles.find((c) => c.id === id);
      if (!consoleFound) {
        console.log("Consola no encontrada");
        return null;
      }
      console.log(`Consola encontrada: ${JSON.stringify(consoleFound)}`);
      return consoleFound;
    } catch (error) {
      console.log("Error al leer la consola", error);
    }
  }

  // Agregar un videojuego a la consola
  async addGameToConsole(consoleId, gameId) {
    try {
      const consoleFound = this.consoles.find((c) => c.id === consoleId);
      if (!consoleFound) {
        console.log("Consola no encontrada");
        return null;
      }

      // Simulamos que el "gameId" es el nombre del juego (en lugar de un ID numérico)
      const game = consoleFound.games.find((g) => g.id === gameId);
      if (game) {
        game.quantity++; // Si el juego ya está en la consola, incrementamos la cantidad
        console.log(`Se ha incrementado la cantidad del juego: ${gameId}`);
      } else {
        consoleFound.games.push({ id: gameId, quantity: 1 }); // Si el juego no está en la consola, lo agregamos
        console.log(`Juego agregado a la consola: ${gameId}`);
      }
      return consoleFound;
    } catch (error) {
      console.log("Error al agregar el juego a la consola", error);
    }
  }
}

export default ConsoleManager;
