/* 
Author: Rashaan Lightpool
11/09/2023
Project 2: Rock, Paper, Scissors Web Game
SD 230 - Professor Stuart, WCC
script.js
*/


// Game state variables
let playerScore = 0;
let computerScore = 0;
let gamesPlayed = 0;
let playerChoice = "";
let computerChoice = "";
let gameStarted = false;

// Functions

// This function is called when the start button is clicked
function startGame() {
  gameStarted = true;
  document.getElementById("start-button").innerText = "Play Hand";
  document.getElementById("subtitle").innerText = "Rock, Paper, Scissors... Shoot!";
  // Turning the hands white and removing the possible tie-game class 
  let choices = document.getElementsByClassName("choice");
  for (let i = 0; i < choices.length; i++) {
    choices[i].style.color = "white";
    choices[i].classList.remove("tie-game");
  }
}

// This function is called when the player clicks the start button 
// again to play their chosen hand
function playHand() {
  if (!gameStarted) return;
  computerChoice = getComputerChoice();
  if (playerChoice === computerChoice) { // Tie game
    // Adding the tie-game class color to the choice
    document.getElementById(playerChoice).classList.add("tie-game");
    document.getElementById("subtitle").innerText = "It's a tie!";
    gamesPlayed++;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    // Player wins
    document.getElementById(computerChoice).style.color = "#DBFEB7";
    document.getElementById("subtitle").innerHTML = `${
        playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
      } beats ${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      }. <span class="win-text">You win!</span>`;
    playerScore++;
    gamesPlayed++;
  } else { // Computer wins
    document.getElementById(computerChoice).style.color = "#DBFEB7";
    document.getElementById("subtitle").innerHTML = `${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      } beats ${
        playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
      }. <span class="lose-text">You lose!</span>`;
    computerScore++;
    gamesPlayed++;
  }
  // Updating the score
  document.getElementById(
    "score"
  ).innerText = `Score: ${playerScore} out of ${gamesPlayed} games`;
  document.getElementById("start-button").innerText = "Play Again";
  gameStarted = false;
}

function resetGame() {
  playerChoice = "";
  computerChoice = "";
}

function getComputerChoice() {
  return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
}

// Event Listeners
document.getElementById("start-button").addEventListener("click", function () {
  if (!gameStarted) {
    startGame();
  } else if (!playerChoice == ""){
    playHand();
    resetGame();
  }
});

document.getElementById("rock").addEventListener("click", function () {
  if (gameStarted) {
    if (playerChoice) {
      document.getElementById(playerChoice).style.color = "white";
    }
    playerChoice = "rock";
    this.style.color = "#fe00b7";
  }
});

document.getElementById("paper").addEventListener("click", function () {
  if (gameStarted) {
    if (playerChoice) {
      document.getElementById(playerChoice).style.color = "white";
    }
    playerChoice = "paper";
    this.style.color = "#fe00b7";
  }
});

document.getElementById("scissors").addEventListener("click", function () {
  if (gameStarted) {
    if (playerChoice) {
      document.getElementById(playerChoice).style.color = "white";
    }
    playerChoice = "scissors";
    this.style.color = "#fe00b7";
  }
});
