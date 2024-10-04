let board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
let height = 500;
let width = 500;
let baseWidth = width * .9;
let baseHeight = baseWidth / 4;
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
// function draw() {

// }

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
    let isClicked = false
    if (!isClicked) {
        isClicked = true
        for (let i = 0; i < holeArr.length; i++) {
            holeArr[i].clicked(mouseX, mouseY, i);
        }
    }
    isClicked = false
    // add protections for turn and turn off mouseclicked when turn is running.
}

let shift;
let netMove;
let isFirst = true;
let marbles;
function turn(position) { 
    marbles = board[position];
    netMove = position + marbles;
    if ((isFirst && board[position] > 0) || board[position] > 1) {
        isFirst = false;
        board[position] = 0;
        shift = 0;
        for (let i = position + 1; i <= netMove; i++) {
            setInterval(moveMarble, 5000, i);
            drawMarbles();
        }
        console.log(board);
        console.log('finished');
        netMove = (position + marbles + shift) % 14;
        console.log("pos" + " " + position + "marbles" + " " + marbles + "shift" + " " + shift);
        goAgain();
    } else {
        p1Turn = !p1Turn;
        isFirst = true;
        console.log("other players turn");
        console.log(p1Turn);
    }
    gameOver();
}

let marblesLeft = marbles;
function moveMarble(i) {
    if (marblesLeft == 0) {
        clearInterval()
    } else {
        if ((p1Turn && i%14 != 13) || (!p1Turn && i%14 != 6)) {
            board[(i) % 14]++;
            marblesLeft --;
            console.log("marble placed at hole " + i%14);
            console.log("there are " + marblesLeft + "marbles left");
        } else {
            shift++;
            netMove++;
            console.log("Goal skipped");
        }
    }
}

function goAgain() {
    if (netMove != 6 && p1Turn) {
        turn(netMove);
    } else if (netMove != 13 && !p1Turn) {
        turn(netMove);
    } else {
        console.log('i should stop');
        isFirst = true;
    }
}

function checkSpot(position) {
    if (p1Turn && position >= 7) {
        console.log("Not your side");
        return false;
    } else if (!p1Turn && position <= 6) {
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

function gameOver() {
    let bottomFilled = false;
    let topFilled = false;
    for(let i = 0; i < 6; i++) {
        if(board[i] != 0) {
            bottomFilled = true;
        }
    }
    for(let i = 7; i < 13; i++) {
        if(board[i] != 0) {
            topFilled = true;
        }
    }
    if (!topFilled || !bottomFilled) {
        collectLeftovers();
        winner();   
    }
}

function collectLeftovers() {
    for(let i = 0; i < 6; i++) {
        board[6] += board[i];
        board[i] = 0;
    }
    for(let i = 7; i < 13; i++) {
        board[13] += board[i];
        board[i] = 0;
    }
    drawMarbles();
}
