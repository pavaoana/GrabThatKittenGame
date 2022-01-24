// Game Logic:
class Game {
  constructor() {
    this.kittensArr = [];
  }

  start() {
    setInterval(() => {
      const kitten = new Kitten();
      this.kittensArr.push(kitten);
      kitten.domElement = this.createDomElm(kitten);
      this.drawDomElm(kitten);
    }, 1000);

    setInterval(() => {
      const kittenToRemove = this.kittensArr.shift();
      console.log(kittenToRemove);
      kittenToRemove.domElement.remove();
    }, 1800);
  }

  createDomElm(instance) {
    const htmlTag = document.createElement("div"); // create html element (not added to the dom yet)
    htmlTag.className = instance.className; // add class (so that we can reuse this function to create different types of elements in the dom, eg. player, obstacles....)
    htmlTag.style.width = instance.width + "vw";
    htmlTag.style.height = instance.height + "vh";
    const board = document.getElementById("game-board"); // get a reference to the parent container
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

    console.log(
      "a kitten was created on position... " +
        this.positionX +
        " , " +
        this.positionY
    );
  }
}

const game = new Game();
game.start();

//
/* 
See if it helps:
https://habr.com/en/sandbox/144776/
https://www.geeksforgeeks.org/design-hit-the-mouse-game-using-html-css-and-vanilla-javascript/
https://stackoverflow.com/questions/24249314/simple-2d-game-using-a-mouse
*/

/* // Instructions Button:
function expandFunction() {
  let collapsible = document.getElementById("instructions");
  if (collapsible.style.display === "none") {
    collapsible.style.display = "block";
  } else {
    collapsible.style.display = "none";
  } // not really working; the instructions shouldn't appear if the button has not been clicked
} */

/* const startButton = document.querySelector("#start-button");
    startButton.addEventListener("click", () => {
      startButton.style.display = "none";
    });*/
