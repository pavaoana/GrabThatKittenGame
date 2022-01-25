// Game Logic:
class Game {
  constructor() {
    this.kittensArr = [];
    this.kittensClicked = 0;
    this.createKittensIntervalId = null;
    this.removeKittensIntervalId = null;
    this.gameOver = false;
    this.gameOverPage = document.getElementById("game-over-page");
    this.gamePage = document.getElementById("game-board");
  }

  start() {
    //this.gameOver = false

    this.gameOverPage.style.display = "none";
    this.gamePage.style.display = "block";
    this.createKittensIntervalId = setInterval(() => {
      const kitten = new Kitten();
      this.kittensArr.push(kitten);
      kitten.domElement = this.createDomElm(kitten);
      this.drawDomElm(kitten);

      // add event listener
      kitten.domElement.addEventListener("click", (event) => {
        kitten.domElement.remove();
        this.kittensClicked++;
        console.log("clicked a kitten");
        console.log(this.kittensClicked);
      });
      if (this.kittensArr.length >= 10 && this.kittensClicked <= 7) {
        this.endGame();
        //alert("Game Over!");
        clearInterval(this.createKittensIntervalId);
        this.gameOver = true;
      } else if (this.kittensArr.length >= 10 && this.kittensClicked > 7) {
        alert("You Won!");
        clearInterval(this.createKittensIntervalId);
        this.gameOver = true;
      }
    }, 1000);

    this.removeKittensIntervalId = setInterval(() => {
      const kittenToRemove = this.kittensArr.shift();
      kittenToRemove.domElement.remove();

      if (this.gameOver) {
        clearInterval(this.removeKittensIntervalId);
      }
    }, 6000);
  }

  createDomElm(instance) {
    const htmlTag = document.createElement("div"); // create html element (not added to the dom yet)
    htmlTag.className = instance.className; // add class (we can reuse this function to create different types of elements in the dom, eg. player, obstacles....)
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

  endGame() {
    this.gameOverPage.style.display = "block";
    this.gamePage.style.display = "none";
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

const game = new Game();
game.start();
