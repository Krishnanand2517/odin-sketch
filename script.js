const gridSize = 16;
const gridContainer = document.querySelector(".grid-container");

function createSquare(gridRow) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    
    gridRow.appendChild(square);
}

function createRow() {
    const row = document.createElement("div");
    row.classList.add("grid-row");

    gridContainer.appendChild(row);

    return row;
}

for (let i = 0; i < gridSize; i++) {
    row = createRow();
    for (let j = 0; j < gridSize; j++){
        createSquare(row);
    }
}

gridContainer.style.width = gridSize * 30 + (gridSize - 2) * 2 + "px";