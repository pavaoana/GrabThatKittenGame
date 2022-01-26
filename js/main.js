// Game Logic:
class Game {
  constructor() {
    this.kittensArr = [];
    this.mommaCatArr = [];

    this.catsClicked = 0;
    this.mommaPoints = 3;
    this.maxKittens = 13;
    // if max=13, max it's actually 23 (we're removing elements from the array)
    this.minKittens = 14; // for the same reason, this doesn't need to be lower than maxKittens

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
    this.gameOver = false;

    this.gameOverPage.style.display = "none";
    this.gameWinPage.style.display = "none";
    this.gamePage.style.display = "block";

    // creating kittens and displaying them
    this.createKittensIntervalId = setInterval(() => {
      const kitten = new Kitten();
      this.kittensArr.push(kitten);
      kitten.domElement = this.createDomElm(kitten);
      this.drawDomElm(kitten);

      // click cats - they disappear - and are added to the basket(sum)
      kitten.domElement.addEventListener("click", (event) => {
        kitten.domElement.remove();
        this.catsClicked++;

        document.getElementById("sum").innerHTML = this.catsClicked;
      });

      //winning and losing:
      if (
        this.kittensArr.length >= this.maxKittens &&
        this.catsClicked <= this.minKittens
      ) {
        this.loseGame();
        clearInterval(this.createKittensIntervalId);
        this.gameOver = true;
      } else if (
        this.kittensArr.length >= this.maxKittens &&
        this.catsClicked > this.minKittens
      ) {
        this.winGame();
        clearInterval(this.createKittensIntervalId);
        this.gameOver = true;
      }
    }, 750); // creating kittens interval

    // removing uncklicled kittens after a while:
    this.removeKittensIntervalId = setInterval(() => {
      const kittenToRemove = this.kittensArr.shift();
      kittenToRemove.domElement.remove();

      if (this.gameOver) {
        clearInterval(this.removeKittensIntervalId);
      }
    }, 1500);

    // creating Momma Cat + display + remove + click + add to basket:

    this.createMommaCatIntervalId = setInterval(() => {
      const momma = new MommaCat();
      this.mommaCatArr.push(momma);
      momma.domElement = this.createDomElm(momma);
      this.drawDomElm(momma);

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

  // creating DOM elements:

  createDomElm(instance) {
    const htmlTag = document.createElement("div"); // create html element
    htmlTag.className = instance.className; // add class
    htmlTag.style.width = instance.width + "vw";
    htmlTag.style.height = instance.height + "vh";
    const board = document.getElementById("game-board"); // parent container
    board.appendChild(htmlTag); // append the element to the dom
    return htmlTag;
  }

  drawDomElm(instance) {
    instance.domElement.style.left = instance.positionX + "vw";
    instance.domElement.style.bottom = instance.positionY + "vh";
  }

  // which pages to display and when:

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

// creating the classes we'll use in the game:

class Kitten {
  constructor() {
    this.className = "kitten";
    this.width = 5;
    this.height = 10;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and 100-width
    this.positionY = Math.floor(Math.random() * (90 - this.height + 1)); // random number between 0 and 90-height (so the cats won't cover the basket counter)
    this.domElement = null;
  }
}

class MommaCat {
  constructor() {
    this.className = "momma";
    this.width = 7;
    this.height = 12;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
    this.positionY = Math.floor(Math.random() * (90 - this.height + 1));
    this.domElement = null;
  }
}

const game = new Game();
game.start();
