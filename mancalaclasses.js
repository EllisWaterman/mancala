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

function createPlayers() {
    p1 = new Player(board[6], true);
    p2 = new Player(board[13], false)
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
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getD() {
        return this.d;
    }
}