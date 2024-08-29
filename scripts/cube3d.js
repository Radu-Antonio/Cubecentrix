var s2 = function (sketch) {
  class RubiksCube {
    constructor(x, y, z, size, colors, index) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;
      this.colors = colors;
      this.index = index;
    }

    draw() {
      let px, py, pz;

      //front
      px = this.x;
      py = this.y;
      pz = this.z + this.size / 2;
      sketch.push();
      sketch.translate(px, py, pz);
      sketch.stroke(0);
      sketch.strokeWeight(1.5);
      sketch.fill(this.colors[0]);
      sketch.box(this.size, this.size, 1);
      sketch.pop();

      //back
      px = this.x;
      py = this.y;
      pz = this.z + (this.size / 2) * -1;
      sketch.push();
      sketch.translate(px, py, pz);
      sketch.stroke(0);
      sketch.strokeWeight(1.5);
      sketch.fill(this.colors[1]);
      sketch.box(this.size, this.size, 1);
      sketch.pop();

      // right
      px = this.x + this.size / 2;
      py = this.y;
      pz = this.z;
      sketch.push();
      sketch.translate(px, py, pz);
      sketch.stroke(0);
      sketch.strokeWeight(1.5);
      sketch.fill(this.colors[2]);
      sketch.box(1, this.size, this.size);
      sketch.pop();

      // left
      px = this.x + (this.size / 2) * -1;
      py = this.y;
      pz = this.z;
      sketch.push();
      sketch.translate(px, py, pz);
      sketch.stroke(0);
      sketch.strokeWeight(1.5);
      sketch.fill(this.colors[3]);
      sketch.box(1, this.size, this.size);
      sketch.pop();

      // top
      px = this.x;
      py = this.y + (size / 2) * -1;
      pz = this.z;
      sketch.push();
      sketch.translate(px, py, pz);
      sketch.stroke(0);
      sketch.strokeWeight(1.5);
      sketch.fill(this.colors[4]);
      sketch.box(this.size, 1, this.size);
      sketch.pop();

      // bottom
      px = this.x;
      py = this.y + size / 2;
      pz = this.z;
      sketch.push();
      sketch.translate(px, py, pz);
      sketch.stroke(0);
      sketch.strokeWeight(1.5);
      sketch.fill(this.colors[5]);
      sketch.box(this.size, 1, this.size);
      sketch.pop();
    }

    updateColor(rotateType, clockwise) {
      const FRONT = 0; // RED
      const BACK = 1; // ORANGE
      const RIGHT = 2; // GREEN
      const LEFT = 3; // BLUE
      const TOP = 4; // YELLOW
      const BOTTOM = 5; // WHITE

      let newColors = [];
      if (rotateType == "z") {
        if (clockwise > 0) {
          newColors.push(this.colors[FRONT]); // FRONT
          newColors.push(this.colors[BACK]); // BACK
          newColors.push(this.colors[TOP]); // RIGHT
          newColors.push(this.colors[BOTTOM]); // LEFT
          newColors.push(this.colors[LEFT]); // TOP
          newColors.push(this.colors[RIGHT]); // BOTTOM
          this.colors = newColors;
        } else {
          newColors.push(this.colors[FRONT]); // FRONT
          newColors.push(this.colors[BACK]); // BACK
          newColors.push(this.colors[BOTTOM]); // RIGHT
          newColors.push(this.colors[TOP]); // LEFT
          newColors.push(this.colors[RIGHT]); // TOP
          newColors.push(this.colors[LEFT]); // BOTTOM
          this.colors = newColors;
        }
      } else if (rotateType == "x") {
        if (clockwise > 0) {
          newColors.push(this.colors[BOTTOM]); // FRONT
          newColors.push(this.colors[TOP]); // BACK
          newColors.push(this.colors[RIGHT]); // RIGHT
          newColors.push(this.colors[LEFT]); // LEFT
          newColors.push(this.colors[FRONT]); // TOP
          newColors.push(this.colors[BACK]); // BOTTOM
          this.colors = newColors;
        } else {
          newColors.push(this.colors[TOP]); // FRONT
          newColors.push(this.colors[BOTTOM]); // BACK
          newColors.push(this.colors[RIGHT]); // RIGHT
          newColors.push(this.colors[LEFT]); // LEFT
          newColors.push(this.colors[BACK]); // TOP
          newColors.push(this.colors[FRONT]); // BOTTOM
          this.colors = newColors;
        }
      } else if (rotateType == "y") {
        if (clockwise > 0) {
          newColors.push(this.colors[LEFT]); // FRONT
          newColors.push(this.colors[RIGHT]); // BACK
          newColors.push(this.colors[FRONT]); // RIGHT
          newColors.push(this.colors[BACK]); // LEFT
          newColors.push(this.colors[TOP]); // TOP
          newColors.push(this.colors[BOTTOM]); // BOTTOM
          this.colors = newColors;
        } else {
          newColors.push(this.colors[RIGHT]); // FRONT
          newColors.push(this.colors[LEFT]); // BACK
          newColors.push(this.colors[BACK]); // RIGHT
          newColors.push(this.colors[FRONT]); // LEFT
          newColors.push(this.colors[TOP]); // TOP
          newColors.push(this.colors[BOTTOM]); // BOTTOM
          this.colors = newColors;
        }
      }
    }
  }

  const size = 50;
  const dim = 3;
  let cubes = [];

  /* AUTO ANIMATION - RANDOM */
  const moves = ["f", "F", "b", "B", "r", "R", "l", "L", "u", "U", "d", "D"];
  let listMoves = [];
  let autoanimation = true;
  let backwardMoves = false;

  let colors = [
    [0, 200, 0],
    [0, 0, 255],
    [255, 0, 0],
    [255, 100, 0],
    [255, 255, 255],
    [255, 255, 0],
  ];

  let indexes = [
    {
      name: "FRONT",
      rotateType: "z",
      position: 1,
      cubes: [2, 11, 20, 5, 14, 23, 8, 17, 26],
      clockwise: [8, 5, 2, 17, 14, 11, 26, 23, 20],
      anticlockwise: [20, 23, 26, 11, 14, 17, 2, 5, 8],
    },
    {
      name: "BACK",
      rotateType: "z",
      position: -1,
      cubes: [18, 9, 0, 21, 12, 3, 24, 15, 6],
      clockwise: [0, 3, 6, 9, 12, 15, 18, 21, 24],
      anticlockwise: [24, 21, 18, 15, 12, 9, 6, 3, 0],
    },
    {
      name: "RIGHT",
      rotateType: "x",
      position: 1,
      cubes: [20, 19, 18, 23, 22, 21, 26, 25, 24],
      clockwise: [26, 23, 20, 25, 22, 19, 24, 21, 18],
      anticlockwise: [18, 21, 24, 19, 22, 25, 20, 23, 26],
    },
    {
      name: "LEFT",
      rotateType: "x",
      position: -1,
      cubes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      clockwise: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      anticlockwise: [6, 3, 0, 7, 4, 1, 8, 5, 2],
    },
    {
      name: "TOP",
      rotateType: "y",
      position: -1,
      cubes: [0, 9, 18, 1, 10, 19, 2, 11, 20],
      clockwise: [18, 19, 20, 9, 10, 11, 0, 1, 2],
      anticlockwise: [2, 1, 0, 11, 10, 9, 20, 19, 18],
    },
    {
      name: "BOTTOM",
      rotateType: "y",
      position: 1,
      cubes: [8, 17, 26, 7, 16, 25, 6, 15, 24],
      clockwise: [6, 7, 8, 15, 16, 17, 24, 25, 26],
      anticlockwise: [26, 25, 24, 17, 16, 15, 8, 7, 6],
    },
  ];

  let animating = false;
  let angle = 0;
  let clockwise = 1;
  let position;
  let rotateType = null;
  let index;

  sketch.setup = function () {
    sketch.pixelDensity(1);
    let cnvs = sketch.createCanvas(600, 600, sketch.WEBGL);
    cnvs.parent("container-cube");
    sketch.setAttributes("antialias", true);
    index = 0;
    cubes = [];

    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        for (let k = 0; k < dim; k++) {
          let px = i * size - size;
          let py = j * size - size;
          let pz = k * size - size;
          let cube = new RubiksCube(px, py, pz, size, colors, index);
          cubes.push(cube);
          index++;
        }
      }
    }
  };

  sketch.draw = function () {
    sketch.background(64);
    sketch.orbitControl();

    if (animating) {
      if (autoanimation) {
        angle = angle += 0.12;
      } else {
        angle = angle += 0.15;
      }
      if (angle >= sketch.HALF_PI) {
        angle = sketch.HALF_PI;
        animating = false;
        updateRubiksCubeColors();
      }
    } else {
      /* AUTO ANIMATION - RANDOM */
      if (autoanimation) {
        if (listMoves.length < 30 && !backwardMoves) {
          let mKey = moves[Math.floor(Math.random() * moves.length)];
          play(mKey);
          listMoves.push(mKey);
        } else {
          backwardMoves = true;
          if (listMoves.length > 0) {
            play(flipMove(listMoves.pop()));
          } else {
            backwardMoves = false;
            autoanimation = false;
          }
        }
      }
    }

    cubes.forEach((cube) => {
      if (animating) {
        sketch.push();
        sketch.translate(0, 0, 0);
        if (cube.z == size * position && rotateType == "z") {
          sketch.rotateZ(angle * clockwise);
        } else if (cube.x == size * position && rotateType == "x") {
          sketch.rotateX(angle * clockwise);
        } else if (cube.y == size * position && rotateType == "y") {
          sketch.rotateY(angle * clockwise);
        }
        cube.draw();
        sketch.pop();
      } else {
        cube.draw();
      }
    });
  };

  function keyPressed() {
    if (!autoanimation) {
      play(key);
    }
  }

  function play(key) {
    if (!animating) {
      angle = 0;
      switch (key) {
        case "f":
          clockwise = 1;
          position = 1;
          rotateType = "z";
          animating = true;
          break;
        case "F":
          clockwise = -1;
          position = 1;
          rotateType = "z";
          animating = true;
          break;
        case "b":
          clockwise = -1;
          position = -1;
          rotateType = "z";
          animating = true;
          break;
        case "B":
          clockwise = 1;
          position = -1;
          rotateType = "z";
          animating = true;
          break;
        case "r":
          clockwise = 1;
          position = 1;
          rotateType = "x";
          animating = true;
          break;
        case "R":
          clockwise = -1;
          position = 1;
          rotateType = "x";
          animating = true;
          break;
        case "l":
          clockwise = -1;
          position = -1;
          rotateType = "x";
          animating = true;
          break;
        case "L":
          clockwise = 1;
          position = -1;
          rotateType = "x";
          animating = true;
          break;
        case "u":
          clockwise = -1;
          position = -1;
          rotateType = "y";
          animating = true;
          break;
        case "U":
          clockwise = 1;
          position = -1;
          rotateType = "y";
          animating = true;
          break;
        case "d":
          clockwise = 1;
          position = 1;
          rotateType = "y";
          animating = true;
          break;
        case "D":
          clockwise = -1;
          position = 1;
          rotateType = "y";
          animating = true;
          break;
        default:
          break;
      }
    }
  }

  function flipMove(mKey) {
    if (mKey.toLowerCase() == mKey) {
      return mKey.toUpperCase();
    }
    return mKey.toLowerCase();
  }

  function updateRubiksCubeColors() {
    cubes.forEach((cube) => {
      if (cube.z == size * position && rotateType == "z") {
        cube.updateColor(rotateType, clockwise);
      } else if (cube.x == size * position && rotateType == "x") {
        cube.updateColor(rotateType, clockwise);
      } else if (cube.y == size * position && rotateType == "y") {
        cube.updateColor(rotateType, clockwise);
      }
    });

    let moveColors = [];
    indexes.forEach((item) => {
      if (item.rotateType == rotateType && item.position == position) {
        if (clockwise > 0) {
          item.clockwise.forEach((c) => {
            moveColors.push(cubes[c].colors);
          });
        } else {
          item.anticlockwise.forEach((c) => {
            moveColors.push(cubes[c].colors);
          });
        }
        item.cubes.forEach((c, idx) => {
          cubes[c].colors = moveColors[idx];
        });
      }
    });
  }
};

new p5(s2);
