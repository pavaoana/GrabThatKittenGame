
    this.createMommaCatIntervalId = setInterval(() => {
      const momma = new Kitten();
      this.kittensArr.push(kitten);
      kitten.domElement = this.createDomElm(kitten);
      this.drawDomElm(kitten);

      // add event listener
      kitten.domElement.addEventListener("click", (event) => {
        kitten.domElement.remove();
        this.kittensClicked++;
        document.getElementById("sum").innerHTML = this.kittensClicked;
      });

      if (
        this.kittensArr.length >= this.maxKittens &&
        this.kittensClicked <= this.minKittens
      ) {
        this.loseGame();
        //alert("Game Over!");
        clearInterval(this.createKittensIntervalId);
        this.gameOver = true;
      } else if (
        this.kittensArr.length >= this.maxKittens &&
        this.kittensClicked > this.minKittens
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

    /*
    setInterval(() => {
      const momma = new MommaCat();
      this.mommaCatArr.push(momma);
      momma.domElement = this.createDomElm(momma);
      this.drawDomElm(momma);
      console.log("momma created" + this.positionXMomma + this.positionYMomma);
    }, 8000);

    setInterval(() => {
      const mommaToRemove = this.mommaCatArr.shift();
      mommaToRemove.domElement.remove();
    }, 2000);

    setInterval(() => {
      const rat = new MrRat();
      this.mrRatArr.push(rat);
      rat.domElement = this.createDomElm(rat);
      this.drawDomElm(rat);
    }, 5000);

    setInterval(() => {
      const ratToRemove = this.mrRatArr.shift();
      ratToRemove.domElement.remove();
    }, 2000);
    */
  }

  grabKitten() {}

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
    this.positionXMomma = Math.floor(Math.random() * (100 - this.width + 1));
    this.positionYMomma = Math.floor(Math.random() * (100 - this.height + 1));
    this.domElement = null;
  }
}
/*
class MrRat {
  constructor() {
    this.className = "rat";
    this.width = 10;
    this.height = 4;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
    this.positionY = Math.floor(Math.random() * (100 - this.height + 1));
    this.domElement = null;
  } 
} */

const game = new Game();
game.start();

//
/* 
See if it helps:
https://habr.com/en/sandbox/144776/
https://www.geeksforgeeks.org/design-hit-the-mouse-game-using-html-css-and-vanilla-javascript/
*/
