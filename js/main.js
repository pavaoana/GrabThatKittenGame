// Instructions Button:
function expandFunction() {
  let collapsible = document.getElementById("instructions");
  if (collapsible.style.display === "none") {
    collapsible.style.display = "block";
  } else {
    collapsible.style.display = "none";
  } // not really working; the instructions shouldn't appear if the button has not been clicked
}

// Game Logic:
class Game {
  constructor() {
    this.kittensArr = [];
    this.kittenCounter = 0; // necessary?
  }

  start() {
    const startButton = document.querySelector("#start-button");
    startButton.addEventListener("click", () => {
      startButton.style.display = "none";
    });

    kittensAppear();
  }

  /* using a setInterval() for this????:

  const newKitten = new Kitten();
  this.kittensArr.push(newKitten);
  newKitten.domElement = this.createDomElm(newKitten);
  this.drawDomElm(newKitten);

  this.kittensArr.forEach((kitten) => {
  kitten.kittensAppear();
  this.drawDomElm(kitten);
  });

  */

  /* 
    createDomElm(instance){
    const htmlTag = document.createElement("div"); 
    htmlTag.className = instance.className; 
    htmlTag.style.width = instance.width + "vw";
    htmlTag.style.height = instance.height + "vh";
    const board = document.getElementById("board"); 
    board.appendChild(htmlTag); 
    return htmlTag;
  }
  */

  /* 
  drawDomElm(kitten) {
    kitten.domElement = kitten.positionX + "vw";
  }
  */

  endGame() {}
}

class Kitten {
  constructor() {
    this.className = "kitten";
    this.width = 5;
    this.height = 10;
    // this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
    // this.positionY = Math.floor(Math.random() * (100 - this.width + 1));
  }

  kittensAppear() {}
}

const game = new Game();
game.start();

/* 
See if it helps:
https://habr.com/en/sandbox/144776/
https://www.geeksforgeeks.org/design-hit-the-mouse-game-using-html-css-and-vanilla-javascript/
https://stackoverflow.com/questions/24249314/simple-2d-game-using-a-mouse
*/
