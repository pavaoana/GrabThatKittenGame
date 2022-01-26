// Game Logic:
class Game {
  constructor() {
    this.kittensArr = [];
    this.mommaCatArr = [];
    this.catsClicked = 0;
    this.mommaPoints = 3;
    this.maxKittens = 13; // if max=15, max it's actually 27 because we're removing elements from the array ( if 13, then it's 23)
    this.minKittens = 14; // this doesnt need to be lower that the max due to the reason above
    this.createKittensIntervalId = null;
    this.removeKittensIntervalId = null;
    this.createMommaIntervalId = null;
    this.removeMommaIntervalId = null;
    this.gameOver = false;
    this.gameOverPage = document.getElementById("game-over-page");
    this.gameWinPage = document.getElementById("game-win-page");
    this.gamePage = document.getElementById("game-board");
    this.counter = document.getElementById("counter");
  }

  start() {
    //this.gameOver = false

    this.gameOverPage.style.display = "none";
    this.gameWinPage.style.display = "none";
    this.gamePage.style.display = "block";

    this.createKittensIntervalId = setInterval(() => {
      const kitten = new Kitten();
      this.kittensArr.push(kitten);
      kitten.domElement = this.createDomElm(kitten);
      this.drawDomElm(kitten);

      // add event listener
      kitten.domElement.addEventListener("click", (event) => {
        kitten.domElement.remove();
        this.catsClicked++;
        document.getElementById("sum").innerHTML = this.catsClicked;
      });

      if (
        this.kittensArr.length >= this.maxKittens &&
        this.catsClicked <= this.minKittens
      ) {
        this.loseGame();
        //alert("Game Over!");
        clearInterval(this.createKittensIntervalId);
        this.gameOver = true;
      } else if (
        this.kittensArr.length >= this.maxKittens &&
        this.catsClicked > this.minKittens
      ) {
        // alert("You Won!");
        this.winGame();
        clearInterval(this.createKittensIntervalId);
        this.gameOver = true;
      }
    }, 750);

    this.removeKittensIntervalId = setInterval(() => {
      const kittenToRemove = this.kittensArr.shift();
      kittenToRemove.domElement.remove();

      if (this.gameOver) {
        clearInterval(this.removeKittensIntervalId);
      }
    }, 1500);

    // Momma Down
    this.createMommaCatIntervalId = setInterval(() => {
      const momma = new MommaCat();
      this.mommaCatArr.push(momma);
      momma.domElement = this.createDomElm(momma);
      this.drawDomElm(momma);

      // add event listener
      momma.domElement.addEventListener("click", (event) => {
        momma.domElement.remove();
        this.catsClicked += this.mommaPoints;
        document.getElementById("sum").innerHTML = this.catsClicked;
      });
    }, 6000);

    this.removeMommaIntervalId = setInterval(() => {
      const mommaToRemove = this.mommaCatArr.shift();
      mommaToRemove.domElement.remove();

      if (this.gameOver) {
        clearInterval(this.removeMommaIntervalId);
      }
    }, 6900);
  }
  // Momma Up

  createDomElm(instance) {
    const htmlTag = document.createElement("div"); // create html element (not in the DOM yet)
    htmlTag.className = instance.className; // add class (can reuse this function to create other elements in the DOM)
    htmlTag.style.width = instance.width + "vw";
    htmlTag.style.height = instance.height + "vh";
    const board = document.getElementById("game-board"); // reference to the parent container
    board.appendChild(htmlTag); // append the element to the dom
    return htmlTag;
  }

  drawDomElm(instance) {
    instance.domElement.style.left = instance.positionX + "vw";
    instance.domElement.style.bottom = instance.positionY + "vh";
  }

  loseGame() {
    this.gameOverPage.style.display = "block";
    this.gameWinPage.style.display = "none";
    this.gamePage.style.display = "none";
    this.counter.style.display = "none";
  }

  winGame() {
    this.gameOverPage.style.display = "none";
    this.gameWinPage.style.display = "block";
    this.gamePage.style.display = "none";
    this.counter.style.display = "none";
  }
}

class Kitten {
  constructor() {
    this.className = "kitten";
    this.width = 5;
    this.height = 10;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and 100-width
    this.positionY = Math.floor(Math.random() * (100 - this.height + 1)); // random number between 0 and 100-height
    this.domElement = null;
  }
}

class MommaCat {
  constructor() {
    this.className = "momma";
    this.width = 7;
    this.height = 12;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
    this.positionY = Math.floor(Math.random() * (100 - this.height + 1));
    this.domElement = null;
  }
}

const game = new Game();
game.start();
