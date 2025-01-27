// TECLADO
const keyboard = document.getElementById("keyboard");
const keys = [
  "Q",
  "w",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Ñ",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];
keys.forEach(
  (key) => (keyboard.innerHTML += `<span id="key-${key}">${key}</span>`)
);

const keyElements = [];
for (let i = 0; i < keys.length; i++) {
  const keyElement = document.getElementById(`key-${keys[i]}`);
  keyElements.push({ element: keyElement, value: keys[i], used: false });
}

// MUESTRA LETRA POR LETRA
const containerWord = document.getElementById("word-container");
const word = "deporte".toUpperCase();
const lettersCorrects = "".padStart(word.length, " ").split("");
for (let i = 0; i < word.length; i++) {
  containerWord.innerHTML += `<span> <p>${lettersCorrects[i]}</p> </span>`;
}

// JUEGO
const lifesCount = document.getElementById("lifes");
let lifes = 6;
lifesCount.textContent = lifes;

keyElements.forEach((key) => {
  const letter = key.element;
  letter.addEventListener("click", (e) => {
    e.preventDefault();
    letter.style.backgroundColor = "#777";
    if (key.used) {
      const notifError = new Notyf({
        duration: 1500,
        position: { x: "center", y: "top" },
      });
      notifError.error("Ya usaste esta letra");
    } else {
      key.used = true;
      if (word.includes(key.value)) {
        containerWord.innerHTML = "";
        for (let i = 0; i < word.length; i++) {
          word[i] === key.value ? (lettersCorrects[i] = key.value) : null;
          containerWord.innerHTML += `<span> <p>${lettersCorrects[i]}</p> </span>`;
        }
      } else {
        lifes--;
        lifesCount.textContent = lifes;
      }
      console.log(lettersCorrects);
    }
  });
});
