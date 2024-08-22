let selectedColor = 'white';

document.querySelectorAll('.color').forEach(colorDiv => {
    colorDiv.addEventListener('click', function () {
        selectedColor = this.getAttribute('data-color');
    });
});

document.querySelectorAll('.face div').forEach(square => {
    square.style.backgroundColor = 'white';
    square.addEventListener('click', function () {
        this.style.backgroundColor = selectedColor;
    });
});

Cube.initSolver();

document.getElementById('solve-button').addEventListener('click', function () {
    let colorToSide = {
        'white': 'U',
        'yellow': 'D',
        'blue': 'B',
        'green': 'F',
        'red': 'R',
        'orange': 'L'
    };
    let cubestring = [];
    let faces = ["top-face",
        "right-face",
        "front-face",
        "bottom-face",
        "left-face",
        "back-face"];

    faces.map(faceId => document.getElementById(faceId))
        .forEach(face => {
            console.log(face)
            face.querySelectorAll('div').forEach(square => {
                cubestring.push(colorToSide[square.style.backgroundColor]);
            });
        });

    const cube = Cube.fromString(cubestring.join(""));
    const solution = cube.solve();
    document.getElementById('solution-output').textContent = "Solution: " + solution;
});