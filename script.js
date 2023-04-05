let gridSize = 16;
let isMouseDown = false;
let isRainbowModeOn = false;
let isPencilModeOn = false;
let currentBgColor = "rgb(255, 128, 82)";
const gridContainer = document.querySelector(".grid-container");
const sizeButton = document.querySelector(".btn-size");
const clearButton = document.querySelector(".btn-clear");
const rainbowButton = document.querySelector(".btn-rainbow");
const pencilButton = document.querySelector(".btn-pencil");

// Creates all the required squares of the grid
function createSquare(gridRow) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.backgroundColor = currentBgColor;
    
    gridRow.appendChild(square);
}

// Creates each row of the grid
function createRow() {
    const row = document.createElement("div");
    row.classList.add("grid-row");

    gridContainer.appendChild(row);

    return row;
}

// Checks if the mouse is clicked and held
function checkMouseClick() {
    document.body.onmousedown = (event) => { isMouseDown = true; };
    document.body.onmouseup = (event) => { isMouseDown = false; };

    return isMouseDown;
}

// Creates the grid
function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        row = createRow();
        for (let j = 0; j < gridSize; j++){
            createSquare(row);
        }
    }
}

// Remove the old grid after resizing
function removeGrid() {
    const oldRows = document.querySelectorAll(".grid-row");
    oldRows.forEach(row => gridContainer.removeChild(row));
}

// Painting
function startPainting() {
    const gridSquares = document.querySelectorAll(".grid-square");

    gridSquares.forEach(square => square.addEventListener("mousedown", paintSquare));

    gridSquares.forEach(square => square.addEventListener("mouseenter", paintSquare));
}

// Paint one square
function paintSquare(event) {
    if (event.type != "mousedown" && !checkMouseClick()) return;

    let drawColor = "#333";
    if (isRainbowModeOn) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        drawColor = "#" + randomColor;
    }
    else if (isPencilModeOn) {
        const bgColor = event.target.style.backgroundColor;
        let rgbArray = bgColor.substring(4, bgColor.length-1).replace(/ /g, '').split(',');
        rgbArray[0] -= 40, rgbArray[1] -= 40, rgbArray[2] -= 40;
        drawColor = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
    }

    event.target.style.backgroundColor = drawColor;
}

// Sets up a new grid ready for painting
function setupGrid() {
    removeGrid();
    createGrid();
    startPainting();
}

// Change Size of Grid
sizeButton.addEventListener("click", (event) => {
    gridSize = (prompt("Enter the size (max. 100)", 16)).toString();
    if (gridSize > 100) gridSize = 100;

    setupGrid();
});

// Clear the Grid
clearButton.addEventListener("click", (event) => {
    setupGrid();
});

// Rainbow Mode - Toggle
rainbowButton.addEventListener("click", (event) => {
    isRainbowModeOn = !isRainbowModeOn;
    rainbowButton.classList.toggle("btn-pressed");

    if (isRainbowModeOn && isPencilModeOn) {
        isPencilModeOn = false;
        pencilButton.classList.remove("btn-pressed");
    }
});

// Pencil Mode - Toggle
pencilButton.addEventListener("click", (event) => {
    isPencilModeOn = !isPencilModeOn;
    pencilButton.classList.toggle("btn-pressed");

    if (isPencilModeOn && isRainbowModeOn) {
        isRainbowModeOn = false;
        rainbowButton.classList.remove("btn-pressed");
    }

    setupGrid();        // Make a fresh grid
});


createGrid();
startPainting();