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
}

/** This function redraws the sketch multiple times a second. */
function draw() {

}

class Player {
    constructor(p1) {
        this.score = 0;
        this.isP1 = p1;
    }
    playerTurn(position) {
        if (checkSpot(position)) {
            moveMarble(position);
        }

        //playerTurn(p1turn);
    }
}

class Hole {
    constructor(x, y, d) {
        this.x = x;
        this.y = y;
        this.d = d;
    }
    drawHole() {
        fill(70, 29, 16);
        noStroke();
        circle(this.x, this.y, this.d);
    }
    clicked(x, y, hole) {
        if (dist(x, y, this.x, this.y) < this.d / 2) {
            console.log("I am hole #" + " " + hole);
            if (p1Turn) {
                p1.playerTurn(hole)
            } else {
                p2.playerTurn(hole)
            }
        }
    }
}

function createPlayers() {
    p1 = new Player(board[6], true);
    p2 = new Player(board[13], false)
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

function drawBoard() {
    drawBase();
    drawHoles();
    drawGoals();
}
function drawHoles() {
    topRow();
    bottomRow();
}

function drawBase() {
    fill(218, 109, 66);
    rect(baseX, baseY, baseWidth, baseHeight, 15);
}



function topRow() {
    let sectionWidth = baseWidth / 8;
    let holeX = baseX + sectionWidth * .5;
    for (let i = 0; i < 8; i++) {
        topHoles.push(new Hole(holeX, baseY + baseHeight / 4, sectionWidth * .8));
        holeX += sectionWidth;
    }
    for (let i = 0; i < topHoles.length; i++) {
        topHoles[i].drawHole();
    }
}

function bottomRow() {
    let sectionWidth = baseWidth / 8;
    let holeX = baseX + sectionWidth * .5;

    for (let i = 0; i < 8; i++) {
        bottomHoles.push(new Hole(holeX, baseY + baseHeight * 3 / 4, sectionWidth * .8));
        holeX += sectionWidth;
    }
    for (let i = 0; i < bottomHoles.length; i++) {
        bottomHoles[i].drawHole();
    }
}

function drawGoals() {
    let sectionWidth = baseWidth / 8;
    let goalX = baseX + sectionWidth * .1;
    for (let i = 0; i < 2; i++) {
        noStroke();
        fill(70, 29, 16);
        rect(goalX, baseY + baseHeight / 4, sectionWidth * .8, baseHeight * .5);
        goalX += sectionWidth * 7;
    }
}



function mouseClicked() {
    for (let i = 0; i < holeArr.length; i++) {
        holeArr[i].clicked(mouseX, mouseY, i);
    }
    // add protections for turn and turn off mouseclicked when turn is running.
}
let shift;
function moveMarble(position) {
    let marbles = board[position];
    let netMove = position + marbles
    if (board[position] > 1) { 
        board[position] = 0;
        shift = 0;
        for (let i = position + 1; i <= netMove; i++) {
            // console.log(shift);
            if (p1Turn && i != 13) {
                board[(i)% 14]++;
            } else if (!p1Turn && i != 6) {
                board[(i) % 14]++;
            } else {
                shift ++;
                netMove++;
            }
        }
    } else {
        //captureOpp(position);
        p1Turn = !p1Turn;
    }
    console.log(board);
    console.log(p1Turn);
    netMove = (position + marbles + shift) % 14;
    console.log("pos " + position + " marbles " + marbles +" shift " + shift);
    goAgain(netMove);
    console.log('i should stop');
}

function captureOpp(pos) {
    if (board[pos] == 1 && p1Turn && (0 <= pos && pos <= 5)) {
        board[6] += 1 + board[14 - pos];
        board[pos] = 0;
        board[14 - pos] = 0;
    } else if (board[pos] == 1 && !p1Turn && (7 <= pos && pos <= 12)) {
        board[13] += 1 + board[14 - pos];
        board[pos] = 0;
        board[14 - pos] = 0;
    }
}

function goAgain(netMove) {
    if (netMove != 6 && p1Turn) {
        console.log('first goal not reached')
        moveMarble(netMove);
    } else if (netMove != 13 && !p1Turn) {
        console.log('second goal not reached')
        moveMarble(netMove);
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
