let capture;
let gridSize = 3;
let gridAreaSize = 300;
let gridTopLeftX;
let gridTopLeftY;
let squareSize;
let colors = [];
let showWindow = true;

const cubeColors = {
  white: [255, 255, 255],
  yellow: [255, 255, 0],
  green: [0, 155, 72],
  blue: [0, 70, 173],
  red: [183, 18, 52],
  orange: [255, 88, 0],
};

function toggleWindowVisibility() {
  showWindow = !showWindow;
  if (showWindow) {
    select("canvas").show();
  } else {
    select("canvas").hide();
  }
}

function setup() {
  cnv = createCanvas(640, 480);
  cnv.parent("camera");
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();

  gridTopLeftX = (width - gridAreaSize) / 2;
  gridTopLeftY = (height - gridAreaSize) / 2;
  squareSize = gridAreaSize / gridSize;

  let button = select("#scan");
  button.mousePressed(captureColors);

  let toggleButton = select("#hide");
  toggleButton.mousePressed(toggleWindowVisibility);
}

function draw() {
  background(220);
  if (showWindow) {
    image(capture, 0, 0, width, height);
    drawGrid();
  }
}

function drawGrid() {
  stroke(255, 255, 255);
  strokeWeight(5);
  noFill();

  for (let i = 0; i <= gridSize; i++) {
    let x = gridTopLeftX + i * squareSize;
    line(x, gridTopLeftY, x, gridTopLeftY + gridAreaSize);
  }

  for (let j = 0; j <= gridSize; j++) {
    let y = gridTopLeftY + j * squareSize;
    line(gridTopLeftX, y, gridTopLeftX + gridAreaSize, y);
  }
}

function captureColors() {
  colors = [];
  const colorToFaceMap = {
    white: "top-face",
    green: "front-face",
    orange: "left-face",
    red: "right-face",
    blue: "back-face",
    yellow: "bottom-face",
  };

  for (let j = 0; j < gridSize; j++) {
    for (let i = 0; i < gridSize; i++) {
      let x = gridTopLeftX + i * squareSize + squareSize / 2;
      let y = gridTopLeftY + j * squareSize + squareSize / 2;
      let c = capture.get(x, y);
      let colorName = getClosestColor(c);
      colors.push(colorName);
    }
  }

  let idx = 0;
  const face = colorToFaceMap[document.getElementById("selectFace").value];
  document
    .getElementById(face)
    .querySelectorAll("div")
    .forEach((square) => {
      if (!square.classList.contains("center"))
        square.style.backgroundColor = colors[idx];
      idx++;
    });
}

function getClosestColor(rgb) {
  let minDist = Infinity;
  let closestColor = "unknown";

  for (const [colorName, colorValue] of Object.entries(cubeColors)) {
    let dist = distSq(
      rgb[0],
      rgb[1],
      rgb[2],
      colorValue[0],
      colorValue[1],
      colorValue[2]
    );
    if (dist < minDist) {
      minDist = dist;
      closestColor = colorName;
    }
  }
  return closestColor;
}

function distSq(r1, g1, b1, r2, g2, b2) {
  return (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2;
}

function colorNameToRGB(colorName) {
  let rgb = cubeColors[colorName];
  return color(rgb[0], rgb[1], rgb[2]);
}
