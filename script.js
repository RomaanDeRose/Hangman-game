// EFECTO CONFETTI
const confettiWin = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
      colors: ["#ea5455", "#e84545", "#2d4059"],
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

// TECLADO
const keyboard = document.getElementById("keyboard");
const keys = [
  ["Q", "w", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];
keys.forEach((key) => {
  const row = document.createElement("div");
  row.classList.add("keyboard-row");
  keyboard.appendChild(row);

  key.forEach((letter) => {
    row.innerHTML += `<button id="key-${letter}" class="key">${letter}</button>`;
  });
});

const keyElements = [];
for (let i = 0; i < keys.length; i++) {
  for (let j = 0; j < keys[i].length; j++) {
    const keyElement = document.getElementById(`key-${keys[i][j]}`);
    keyElements.push({ element: keyElement, value: keys[i][j], used: false });
  }
}

const drawLetter = (containerLetter, letter) => {
  const letterContainer = document.createElement("div");
  letterContainer.classList.add("letter");
  letterContainer.textContent = letter;
  containerLetter.appendChild(letterContainer);
};

// MUESTRA LETRA POR LETRA
const WORDS = [
  "deporte",
  "micro",
  "programa",
  "ahorcado",
  "tenis",
  "nieve",
  "presidente",
  "profesional",
  "computadora",
  "teclado",
  "botella",
  "casa",
  "juego",
  "lenguaje",
  "carrera",
  "pantalla",
  "celular",
  "computadora",
  "cable",
  "auriculares",
];

const containerWord = document.getElementById("word-container");
const word = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
const lettersCorrects = "".padStart(word.length, " ").split("");
for (let i = 0; i < word.length; i++) {
  drawLetter(containerWord, lettersCorrects[i]);
}

// JUEGO
const resetBtn = document.getElementById("reset");
resetBtn.style.display = "none";
const resetGame = () => {
  resetBtn.style.display = "block";
  resetBtn.addEventListener("click", () => {
    window.location.reload();
  });
};

const livesCount = document.getElementById("lives");
let lives = 6;
livesCount.textContent = lives;

keyElements.forEach((key) => {
  key.element.addEventListener("click", (e) => {
    e.preventDefault();
    key.element.style.pointerEvents = "none";
    if (!key.used) {
      key.used = true;
      if (word.includes(key.value)) {
        key.element.style.backgroundColor = "#54ea8145";
        key.element.style.border = "1px solid #54ea81";
        containerWord.innerHTML = "";
        for (let i = 0; i < word.length; i++) {
          word[i] === key.value ? (lettersCorrects[i] = key.value) : null;
          drawLetter(containerWord, lettersCorrects[i]);
        }
      } else {
        key.element.style.backgroundColor = "#ea545545";
        key.element.style.border = "1px solid #ea5455";
        lives--;
        livesCount.textContent = lives;
      }
    }

    if (lettersCorrects.join("") === word) {
      keyboard.style.display = "none";
      const notifSuccess = new Notyf({
        duration: 3500,
        position: { x: "center", y: "top" },
      });
      notifSuccess.success("¡Felicidades! Has ganado");
      confettiWin();
      resetGame();
    }

    if (lives === 0) {
      keyboard.style.display = "none";
      const notifError = new Notyf({
        duration: 3500,
        position: { x: "center", y: "top" },
        className: "error",
      });
      notifError.error("La palabra era " + word);
      resetGame();
    }
  });
});

const isLetter = (str) =>
  str.length === 1 && str.match(/[a-z]/i) ? true : false;

document.addEventListener("keyup", (e) => {
  e.preventDefault();
  const key = e.key.toUpperCase();
  if (
    isLetter(key) &&
    !keyElements.find((k) => k.value === key).used &&
    lives > 0
  ) {
    const keyElement = keyElements.find((k) => k.value === key);
    keyElement.element.click();
  }

  if (key === "ENTER") resetBtn.click();
});
