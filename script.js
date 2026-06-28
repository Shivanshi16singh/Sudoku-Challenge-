const gameBoard = document.querySelector("#board");
const digits = document.querySelector("#digits");
const deleteNum = document.querySelector("#delete");
const mistake = document.querySelector("#mistake");
let lastSelected = null;
let error = 0;
const puzzle=[
    "1----7-9-",
    "-3--2---8",
    "--96--5--",
    "--53--9--",
    "-1--8---2",
    "6----4---",
    "3------1-",
    "-4------7",
    "--7---3--"
];
const solution=[
    "162857493",
    "534129678",
    "789643521",
    "475312986",
    "913586742",
    "628794135",
    "356478219",
    "241935867",
    "897261354"
];
window.onload = function(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.setAttribute("row", i);
            tile.setAttribute("col", j);
            tile.addEventListener("click", selectTile);
            if (puzzle[i][j] !== "-") {
                tile.innerText = puzzle[i][j];
                tile.classList.add("filled");
            }
            if (i === 2 || i === 5)
                tile.classList.add("border-bottom");
            if (j === 2 || j === 5)
                tile.classList.add("border-right");
            gameBoard.appendChild(tile);
        }
    }
    for (let i = 1; i <= 9; i++) {
        const num = document.createElement("div");
        num.classList.add("tile");
        num.innerText = i;
        num.style.height =gameBoard.querySelector(".tile").clientHeight + "px";
        num.addEventListener("click", addNumber);
        digits.appendChild(num);
    }
}
function selectTile(){
    if (lastSelected != null) {
        lastSelected.classList.remove("select-tile");
    }
    lastSelected = this;
    lastSelected.classList.add("select-tile");
}
function addNumber() {
    if (lastSelected == null) {
        alert("Please select a tile first!");
        return;
    }
    if (lastSelected.classList.contains("filled"))
        return;
    lastSelected.innerText = this.innerText;
    let row = lastSelected.getAttribute("row");
    let col = lastSelected.getAttribute("col");
    if (solution[row][col] === lastSelected.innerText) {
        lastSelected.classList.remove("danger");
    } else {
        if (!lastSelected.classList.contains("danger")) {
            error++;
            mistake.innerText = error;
        }
        lastSelected.classList.add("danger");
    }
    if (error > 3) {
        alert("You Lost!");
        location.reload();
    }
    checkWinner();
}
deleteNum.onclick = function(){
    if (lastSelected == null)
        return;
    if (lastSelected.classList.contains("filled"))
        return;
    lastSelected.innerText = "";
    lastSelected.classList.remove("danger");
}

function checkWinner(){
    if (!isAllTilesFilled())
        return;
    const allTiles = gameBoard.querySelectorAll(".tile");
    let index = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (allTiles[index].innerText !== solution[i][j]) {
                return;
            }
            index++;
        }
    }
    setTimeout(() => {
        alert("🎉 Congratulations! You solved the Sudoku!");
    }, 100);
}

function isAllTilesFilled() {
    const allTiles = gameBoard.querySelectorAll(".tile");
    return [...allTiles].every(tile => tile.innerText !== "");
}