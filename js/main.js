class Game {
  constructor() {
    this.kittensArr = [];
    this.kittenCounter = 0;
    // need to determine kittens appearance frequency?
  }

  start() {
    this.player = new Player();
    // what happens with the player? it's the mouse

    // the start button disappears

    kittensAppear();
    // kittens appear and we can click on them
  }
}

class Player {
  constructor() {
    // does it need dimensions and position? - it's the mouse
  }
}

class Kittens {
  constructor() {
    this.className = "kitten";
    this.width = 5;
    this.height = 10;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
    this.positionY = Math.floor(Math.random() * (100 - this.width + 1));

    // what is the starting position? they appear randomly on the screen on a fixed position
  }

  kittensAppear() {
    // they disappear right away
  }
}

const game = new Game();
game.start();

/* 
Explorar:
https://habr.com/en/sandbox/144776/
https://www.geeksforgeeks.org/design-hit-the-mouse-game-using-html-css-and-vanilla-javascript/
https://stackoverflow.com/questions/24249314/simple-2d-game-using-a-mouse

*/

// Instructions:
function expandFunction() {
  let collapsible = document.getElementById("instructions");
  if (collapsible.style.display === "none") {
    collapsible.style.display = "block";
  } else {
    collapsible.style.display = "none";
  }
}
