let selectedColor = "white";

document.querySelectorAll(".color").forEach((colorDiv) => {
  colorDiv.addEventListener("click", function () {
    selectedColor = this.getAttribute("data-color");
  });
});

document.querySelectorAll(".face div").forEach((square) => {
  if (!square.classList.contains("center")) {
    square.style.backgroundColor = "white";
    square.addEventListener("click", function () {
      this.style.backgroundColor = selectedColor;
    });
  }
});

document.getElementById("resetColors").addEventListener("click", function () {
  document.querySelectorAll(".face div").forEach((square) => {
    if (!square.classList.contains("center")) {
      square.style.backgroundColor = "white";
    }
  });
});

Cube.initSolver();

let faces = [
  "top-face",
  "right-face",
  "front-face",
  "bottom-face",
  "left-face",
  "back-face",
];

document.getElementById("generate").addEventListener("click", function () {
  let sideToColor = {
    U: "white",
    D: "yellow",
    B: "blue",
    F: "green",
    R: "red",
    L: "orange",
  };
  let cubeString = Cube.random()
    .asString()
    .split("")
    .map((side) => sideToColor[side]);
  let idx = 0;
  faces
    .map((faceId) => document.getElementById(faceId))
    .forEach((face) => {
      face.querySelectorAll("div").forEach((square) => {
        square.style.backgroundColor = cubeString[idx];
        idx++;
      });
    });
});

document.getElementById("solve-button").addEventListener("click", function () {
  let colorToSide = {
    white: "U",
    yellow: "D",
    blue: "B",
    green: "F",
    red: "R",
    orange: "L",
  };
  let cubestring = [];

  faces
    .map((faceId) => document.getElementById(faceId))
    .forEach((face) => {
      face.querySelectorAll("div").forEach((square) => {
        cubestring.push(colorToSide[square.style.backgroundColor]);
      });
    });

  const cube = Cube.fromString(cubestring.join(""));
  const solution = cube.solve();
  document.getElementById("solution-output").textContent =
    "Solution: " + solution;
});
