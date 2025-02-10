// ELECION DE TEMAS
const COLORS = [
  {
    color: "rojo",
    valuePrimary: "#e84545",
    valueSecondary: "#ea5455",
    shadow1: "rgba(234, 84, 85, 0.3)",
    shadow2: "rgba(234, 84, 85, 0.15)",
  },
  {
    color: "azul",
    valuePrimary: "#4553e8",
    valueSecondary: "#5463ea",
    shadow1: "rgba(84, 89, 234, 0.3)",
    shadow2: "rgba(84, 89, 234, 0.15)",
  },
  {
    color: "celeste",
    valuePrimary: "#45e8e8",
    valueSecondary: "#54eaea",
    shadow1: "rgba(84, 234, 234, 0.3)",
    shadow2: "rgba(84, 234, 234, 0.15)",
  },
  {
    color: "rosa",
    valuePrimary: "#c20d9b",
    valueSecondary: "#ff22de",
    shadow1: "rgba(255, 34, 222, 0.3)",
    shadow2: "rgba(255, 34, 222, 0.15)",
  },
  {
    color: "violeta",
    valuePrimary: "#7b1fc2",
    valueSecondary: "#a22ff1",
    shadow1: "rgba(162, 47, 241, 0.3)",
    shadow2: "rgba(162, 47, 241, 0.15)",
  },
  {
    color: "naranja",
    valuePrimary: "#ff8913",
    valueSecondary: "#ff9f22",
    shadow1: "rgba(255, 159, 34, 0.3)",
    shadow2: "rgba(255, 159, 34, 0.15)",
  },
];

const root = document.querySelector(":root");

const setColors = (color) => {
  const selectedColor = COLORS.find(
    (c) => c.color.toUpperCase() == color.toUpperCase()
  );
  root.style.setProperty("--accent", selectedColor.valuePrimary);
  root.style.setProperty("--secondary", selectedColor.valueSecondary);
  root.style.setProperty("--shadowColor", selectedColor.shadow1);
  root.style.setProperty("--shadowColor2", selectedColor.shadow2);
};
setColors(COLORS[0].color);

const themesContainer = document.querySelector(".theme-options");
const themesPicks = [];
COLORS.forEach((color) => {
  const themePick = document.createElement("div");
  themePick.classList.add("theme-option");
  themePick.getAttribute("data-color", color.color);
  themePick.style.backgroundColor = color.valueSecondary;
  themesPicks.push({ value: color.color, element: themePick });
  themesContainer.appendChild(themePick);
});

let themeSelected = [COLORS[0].valuePrimary, COLORS[0].valueSecondary];
themesPicks.forEach((theme) => {
  theme.element.addEventListener("click", (e) => {
    e.preventDefault();
    const themePicked = COLORS.find((p) => p.color === theme.value);
    themeSelected = [themePicked.valuePrimary, themePicked.valueSecondary];
    setColors(theme.value);
    console.log(themeSelected);
  });
  theme.element.addEventListener("mouseover", () => {
    const colorShadow = COLORS.find((p) => p.color === theme.value);
    theme.element.style.boxShadow = `0px 0px 4px ${colorShadow.valueSecondary}`;
  });
  theme.element.addEventListener("mouseout", () => {
    theme.element.style.boxShadow = "none";
  });
});

const theme = document.querySelector(".theme");
const themeButton = document.querySelector(".theme-btn");

themeButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(theme.getAttribute("data-click"));
  if (theme.getAttribute("data-click") === "false") {
    theme.setAttribute("data-click", "true");
    themeButton.classList.replace("bx-palette", "bx-x");
    theme.style.right = "0px";
  } else {
    theme.setAttribute("data-click", "false");
    themeButton.classList.replace("bx-x", "bx-palette");
    theme.style.right = "-278px";
  }
});

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

// EFECTO CONFETTI
const confettiWin = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
      colors: [...themeSelected, "#2d4059"],
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
        key.element.style.backgroundColor = "#54ea8140";
        key.element.style.border = "1px solid #54ea81";
        containerWord.innerHTML = "";
        for (let i = 0; i < word.length; i++) {
          word[i] === key.value ? (lettersCorrects[i] = key.value) : null;
          drawLetter(containerWord, lettersCorrects[i]);
        }
      } else {
        // key.element.style.backgroundColor = "##181e2740";
        // // root.style.getPropertyValue("--secondary") + "40";
        key.element.style.border = "1px solid #ea5455";
        // // "1px solid " + root.style.getPropertyValue("--secondary");
        key.element.style.transform = "scale(0.000001)";
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
