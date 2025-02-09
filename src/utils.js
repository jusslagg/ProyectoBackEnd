export default function generateCode() {
  const lettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Letras mayúsculas
  const lettersLower = "abcdefghijklmnopqrstuvwxyz"; // Letras minúsculas
  const numbers = "0123456789"; // Números
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"; // Símbolos

  // Unir todo en una sola cadena
  const allCharacters = lettersUpper + lettersLower + numbers + symbols;

  // Asegurarnos de que el código tenga al menos un carácter de cada tipo
  const codeLength = 8; // Longitud del código (puedes ajustarlo)

  const randomCode = Array.from({ length: codeLength }, (_, index) => {
    // Para los primeros 4 caracteres, aseguramos que haya uno de cada tipo
    if (index === 0)
      return lettersUpper[Math.floor(Math.random() * lettersUpper.length)];
    if (index === 1)
      return lettersLower[Math.floor(Math.random() * lettersLower.length)];
    if (index === 2) return numbers[Math.floor(Math.random() * numbers.length)];
    if (index === 3) return symbols[Math.floor(Math.random() * symbols.length)];

    // Los demás caracteres serán aleatorios de cualquier categoría
    return allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }).join("");

  return randomCode;
}
