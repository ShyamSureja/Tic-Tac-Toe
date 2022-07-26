let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let w; // = width / 3;
let h; // = height / 3;

let ai = "AI";
let human = "Player";
let currentPlayer = human;

function setup() {
  // noLoop();

  if (displayWidth < 400) {
    createCanvas(displayWidth / 1.5, displayHeight / 3);
  } else if (displayWidth < 768) {
    createCanvas(displayWidth / 2, displayHeight / 3);
  } else if (displayWidth >= 768 && displayWidth < 1024) {
    createCanvas(displayWidth / 2, displayHeight / 2);
  } else if (displayWidth > 1024) {
    createCanvas(displayWidth / 3, displayHeight / 2);
  }

  w = width / 3;
  h = height / 3;
  let first = Math.floor(Math.random() * 3);
  let second = Math.floor(Math.random() * 3);
  // board[first][second] = ai;
}

// chek for winning combinations
function equals3(a, b, c) {
  return a == b && b == c && a != "";
}

function checkWinner() {
  let winner = null;

  // for  horizontal equality
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // for  vertical equality
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // for  diagonal equality
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return "tie";
  } else {
    return winner;
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == "") {
      board[i][j] = human;
      currentPlayer = ai;
      // bestmove function for minimax algorithm
      setTimeout(bestMove, 400);
    }
  }
}

function draw() {
  background(255);
  stroke(0, 0, 0);
  strokeWeight(4);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(64);
      let r = w / 4;
      if (spot == human) {
        textAlign(CENTER, CENTER);
        text("O", x, y);
      } else if (spot == ai) {
        textAlign(CENTER, CENTER);
        text("X", x, y);
      }
    }
  }

  // check for the result
  let result = checkWinner();
  if (result != null) {
    noLoop(); //stop drawin of canvas repeatedly

    if (result === "tie") {
      message.innerText = "Tie 🙄";
    } else {
      message.innerHTML = `Oops...The ${result} wins 😅<br>break AI's Ego by your talent`;
    }

    showMessage();
    showButton();
  }
}

let restartButton = document.querySelector("#btn");
let message = document.querySelector("#text");

function showMessage() {
  message.style.display = "block";
}
function showButton() {
  restartButton.style.display = "block";
}

restartButton.addEventListener("click", () => {
  restart();
});

// redraw canvas
function restart() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  setup();
  draw();
  loop(); // start draw of canvas repeatedly
  message.style.display = "none"; // remove message
  restartButton.style.display = "none"; //remove button
}
