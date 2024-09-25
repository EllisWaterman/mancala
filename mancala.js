let board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
let height = 500;
let width = 500;
let baseWidth = width * .9
let baseHeight = baseWidth / 4
let baseX = width / 2 - baseWidth / 2;
let baseY = height / 2 - baseHeight / 2;
let bottomHoles = [];
let topHoles = [];
let holeArr = [];
let p1Turn = true;
// goals are 0 & 7

/** This function sets up our sketch. */
function setup() {
    createCanvas(width, height);
    drawBoard();
    createPlayers();
    makeHoleArr();
    drawMarbles();
    
    // drawMarbles(0,4);
}

/** This function redraws the sketch multiple times a second. */
function draw() {

}

function makeHoleArr() {
    
    for (let i = 0; i < bottomHoles.length; i++) {
        holeArr.push(bottomHoles[i]);

    }
    for (let i = topHoles.length - 1; i > -1; i--) {
        holeArr.push(topHoles[i]);
    }
    holeArr.splice(0, 1);
    holeArr.splice(7, 1);
}

function mouseClicked() {
    for (let i = 0; i < holeArr.length; i++) {
        holeArr[i].clicked(mouseX, mouseY, i);
    }
    // add protections for turn and turn off mouseclicked when turn is running.
}

let shift = 0;
function moveMarble(position) {
    let marbles = board[position];
    let netMove = position + marbles
    if (board[position] > 1) {
        board[position] = 0;
        shift = 0;
        for (let i = position + 1; i <= netMove; i++) {

            if (p1Turn && i != 13) {
                board[(i) % 14]++;
            } else if (!p1Turn && i != 6) {
                board[(i) % 14]++;
            } else {
                shift++;
                netMove++;
            }
        }
    } else {
        p1Turn = !p1Turn;
    }
    drawMarbles();
    console.log(board);
    console.log(p1Turn);
    netMove = (position + marbles + shift) % 14
    console.log("pos" + " " + position + "marbles" + " " + marbles + "shift" + " " + shift);
    if (netMove != 6 && p1Turn) {
        moveMarble(netMove);
    } else if (netMove != 13 && !p1Turn) {
        moveMarble(netMove);
    } else {
        console.log('i should stop');
    }
}

function checkSpot(position) {
    if (p1Turn && position >= 7) {
        console.log("Not your side");
        return false;
    } else if (!p1Turn && position <= 7) {
        console.log("Not your side");
        return false;
    } else if (position == 6 || position == 13) {
        console.log("That is a goal");
        return false;
    } else if (board[position] == 0) {
        console.log("cant pick up nothing");
        return false;
    } else {
        return true;
    }

}
