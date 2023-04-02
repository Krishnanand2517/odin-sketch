const gridSize = 16;
let isMouseDown = false;
const gridContainer = document.querySelector(".grid-container");

// Creates all the required squares of the grid
function createSquare(gridRow) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    
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
for (let i = 0; i < gridSize; i++) {
    row = createRow();
    for (let j = 0; j < gridSize; j++){
        createSquare(row);
    }
}

const gridSquares = document.querySelectorAll(".grid-square");

// Container border
gridContainer.style.width = gridSize * 30 + (gridSize - 2) * 2 + "px";

// Painting
gridSquares.forEach(square => square.addEventListener("mousedown", (event) => {
    event.target.classList.add("square-drawn");
}));

gridSquares.forEach(square => square.addEventListener("mouseenter", (event) => {
    if (!checkMouseClick()) return;
    event.target.classList.add("square-drawn");
}));