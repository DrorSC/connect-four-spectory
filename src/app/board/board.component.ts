import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  title: string = "The Board";
  board: number[][];
  currentPlayer: number;
  lastRow: number = 5;
  lastCol: number = 7;

  constructor() {
    this.initBoard();
  }

  ngOnInit() {
    this.currentPlayer = 1;
  }

  initBoard() {
    this.board = [];
    for (let i = 0; i < 6; i++) {
      this.board[i] = [];
      for (let j = 0; j < 8; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  getCellClass(row: number, col: number): string {
    if (this.board[row][col] == 1)
      return 'player1';
    else if (this.board[row][col] == 2)
      return 'player2';
    else
      return 'empty';
  }

  addBallToCell(col: number) {
    var emptyRow = this.lastRow;
    // check if column isn't full
    if (this.board[0][col]) {
      return;
    }
    else {
      // find first empty cell - starting from the bottom
      for (let i = 0; i < this.lastRow; i++) {
        if (this.board[emptyRow][col] != 0)
          emptyRow--;
        else
          break;
      }
      // insert current player color/value
      this.board[emptyRow][col] = this.currentPlayer;
      // check if this action made him win!
      if (this.checkWin(emptyRow, col))
        this.gameOver(this.currentPlayer)
      else {
        this.currentPlayer = this.changePlayer();
      }
      //check draw
      for (let i = 0; i < this.lastCol; i++) {
        if (this.board[0][i] == 0)
          break;
        else
          this.gameOver(0);
      }
    }
  }

  changePlayer(): number {
    var h1 = document.getElementById("turn");
    if (this.currentPlayer == 1) {
      h1.style.textAlign = "right";
      h1.style.color = "blue;"
      return 2;
    }
    else {
      h1.style.textAlign = "left";
      h1.style.color = "red;"
      return 1;
    }
  }

  checkWin(row: number, col: number): boolean {
    // Horizontal Check
    var counter = 0;
    for (let i = 0; i <= this.lastCol; i++) {
      if (this.board[row][i] == this.currentPlayer) {
        counter++;
      }
      else
        counter = 0;
      if (counter >= 4)
        return true;
    }
    //Vertical check
    counter =0;
    for (let i = 0; i <= this.lastRow; i++) {
      if (this.board[i][col] == this.currentPlayer)
        counter++;
      else
        counter = 0;

      if (counter >= 4)
        return true;
    }
    counter = 0;
    // top-left to bottom-right from corner down
    for (let rowStart = 0; rowStart <= this.lastRow - 3; rowStart++) {
      for (let currentRow = rowStart, currentCol = 0; currentRow <= this.lastRow && currentCol <= this.lastCol; currentRow++ , currentCol++) {
        if (this.board[currentRow][currentCol] == this.currentPlayer) {
          counter++;
          if (counter >= 4)
            return true;
        }
        else {
          counter = 0;
        }
      }
    }

    counter = 0;
    // top-left to bottom-right - from corner right
    for (let colStart = 1; colStart <= this.lastCol - 3; colStart++) {
      for (let currentRow = 0, currentCol = colStart; currentRow <= this.lastRow && currentCol <= this.lastCol; currentRow++ , currentCol++) {
        if (this.board[currentRow][currentCol] == this.currentPlayer) {
          counter++;
          if (counter >= 4)
            return true;
        }
        else {
          counter = 0;
        }
      }
    }

    counter=0;
    // bottom-left to top-right from corner up
    for (let rowStart = this.lastRow; rowStart >= 3; rowStart--) {
      for (let currentRow = rowStart, currentCol = 0; currentRow >= 0 && currentCol <= this.lastCol; currentRow-- , currentCol++) {
        if (this.board[currentRow][currentCol] == this.currentPlayer) {
          counter++;
          if (counter >= 4)
            return true;
        }
        else {
          counter = 0;
        }
      }
    }

    counter = 0;
    // bottom-left to top-right from corner right
    for (let colStart = 1; colStart <= this.lastCol - 3; colStart++) {
      for (let currentRow = this.lastRow, currentCol = colStart; currentRow >= 0 && currentCol <= this.lastCol; currentRow-- , currentCol++) {
        if (this.board[currentRow][currentCol] == this.currentPlayer) {
          counter++;
          if (counter >= 4)
            return true;
        }
        else {
          counter = 0;
        }
      }
    }

  }

  gameOver(winner: number): void {
    if (winner == 0)
      alert("It's a Draw! reseting game..");
    else
      alert("player " + winner + " Has won!")
    this.resetGame();
  }

  resetGame() {
    this.initBoard();
    // current player stays the same - whoever wins starts!
  }
}
