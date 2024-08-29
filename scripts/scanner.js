var s1 = function (sketch) {
  let capture;
  let gridSize = 3;
  let gridAreaSize = 300;
  let gridTopLeftX;
  let gridTopLeftY;
  let squareSize;
  let colours = [];
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
      sketch.select("canvas").show();
    } else {
      sketch.select("canvas").hide();
    }
  }

  sketch.setup = function () {
    cnv = sketch.createCanvas(640, 480);
    cnv.parent("camera");
    capture = sketch.createCapture(sketch.VIDEO);
    capture.size(sketch.width, sketch.height);
    capture.hide();

    gridTopLeftX = (sketch.width - gridAreaSize) / 2;
    gridTopLeftY = (sketch.height - gridAreaSize) / 2;
    squareSize = gridAreaSize / gridSize;

    let button = sketch.select("#scan");
    button.mousePressed(captureColors);

    let toggleButton = sketch.select("#hide");
    toggleButton.mousePressed(toggleWindowVisibility);
  };
  sketch.draw = function () {
    sketch.background(220);
    if (showWindow) {
      sketch.image(capture, 0, 0, sketch.width, sketch.height);
      drawGrid();
    }
  };

  function drawGrid() {
    sketch.stroke(255, 255, 255);
    sketch.strokeWeight(5);
    sketch.noFill();

    for (let i = 0; i <= gridSize; i++) {
      let x = gridTopLeftX + i * squareSize;
      sketch.line(x, gridTopLeftY, x, gridTopLeftY + gridAreaSize);
    }

    for (let j = 0; j <= gridSize; j++) {
      let y = gridTopLeftY + j * squareSize;
      sketch.line(gridTopLeftX, y, gridTopLeftX + gridAreaSize, y);
    }
  }

  function captureColors() {
    colours = [];
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
        colours.push(colorName);
      }
    }

    let idx = 0;
    const face = colorToFaceMap[document.getElementById("selectFace").value];
    document
      .getElementById(face)
      .querySelectorAll("div")
      .forEach((square) => {
        if (!square.classList.contains("center"))
          square.style.backgroundColor = colours[idx];
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
};

new p5(s1);
