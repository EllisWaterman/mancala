function drawBoard() {
    drawBase();
    drawHoles();
    drawGoals();

}

function drawBase() {
    fill(218, 109, 66);
    rect(baseX, baseY, baseWidth, baseHeight, 15);
}

function drawHoles() {
    topRow();
    bottomRow();
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

function drawMarbles() {
    drawHoles();
    for (let m = 0; m < board.length; m++) {
        drawMarble(m, board[m]);
        drawNumMarbles(m, board[m]);
    }
}

function drawMarble(hole, numMarbles) {
    let red = [255, 0, 0];
    let green = [0, 255, 0];
    let blue = [0, 0, 255];
    let colors = [red, blue, green];
    let selectHole = holeArr[hole];
    let y;
    let x;
    for (let i = 0; i < numMarbles; i++) {
        fill(colors[i % (colors.length)]);
        noStroke();
        y = ((Math.random() * 2 - 1) * ((selectHole.getD() / 2) - (selectHole.getD() * .25))) + selectHole.getY();
        x = ((Math.random() * 2 - 1) * (Math.sqrt((selectHole.getD() / 2) ** 2 - (y - selectHole.getY()) ** 2) - (selectHole.getD() * .15))) + selectHole.getX();
        circle(x, y, selectHole.getD() * .3);
    }
}

function drawNumMarbles(hole, numMarbles) {
    let selectHole = holeArr[hole];
    fill('white');
    stroke("black");
    strokeWeight(5)
    textSize(selectHole.getD() * .7);
    textAlign(CENTER, CENTER);
    text(numMarbles, selectHole.getX(), selectHole.getY());
}

function winner() {
    fill('black');
    stroke("white");
    strokeWeight(5);
    textSize(30);
    textAlign(CENTER, CENTER);
    if (board[6] > board[13]) {
        text("Player 1 won!", width / 2, height / 2);
    }
    if (board[6] < board[13]) {
        text("Player 2 won!", width / 2, height / 2);
    } else {
        text("It's a tie!", width / 2, height / 2);
    }
}