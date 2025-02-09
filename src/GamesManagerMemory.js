import generateCode from "./utils.js";

class GameManager {
  constructor() {
    this.games = []; // Lista de videojuegos
  }

  async getGames() {
    try {
      return this.games;
    } catch (error) {
      console.log("Error al leer los videojuegos", error);
    }
  }

  async getGameById(id) {
    try {
      const game = this.games.find((g) => g.id === id); // Buscar juego por ID
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
      if (!game || !game.title) {
        console.log("Videojuego inválido");
        return;
      }
      const newGame = {
        id: Math.floor(Math.random() * Date.now()), // Generación de un ID único
        code: generateCode(), // Generación de código único
        status: true,
        ...game, // Desestructuración del videojuego recibido
      };
      this.games.push(newGame); // Agregar el videojuego a la lista
      console.log("Videojuego creado:", newGame);
    } catch (error) {
      console.log("Error al crear el videojuego", error);
    }
  }

  async updateGame(id, game) {
    try {
      const index = this.games.findIndex((g) => g.id === id); // Buscar el índice del videojuego

      if (index === -1) {
        console.log("Videojuego no encontrado");
        return null;
      }

      this.games[index] = { ...this.games[index], ...game }; // Actualizar los datos del videojuego

      console.log("Videojuego actualizado:", this.games[index]);
      return this.games[index];
    } catch (error) {
      console.log("Error al actualizar el videojuego", error);
      return null;
    }
  }

  async deleteGame(id) {
    try {
      const index = this.games.findIndex((g) => g.id === id); // Buscar el índice del videojuego
      if (index === -1) {
        console.log("Videojuego no encontrado");
        return;
      }
      this.games.splice(index, 1); // Eliminar el videojuego de la lista
      console.log("Videojuego eliminado");
    } catch (error) {
      console.log("Error al eliminar el videojuego", error);
    }
  }
}

export default GameManager;
