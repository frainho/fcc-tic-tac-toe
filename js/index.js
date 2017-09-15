$(document).ready(function () {

var coord = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var playerSymbol;
var computerSymbol;
var computerMoveChk;
var winnerFound = false;
var winner = '';
var possibleResults = [
  ["1","2","3"],
  ["4","5","6"],
  ["7","8","9"],
  ["1","4","7"],
  ["2","5","8"],
  ["3","6","9"],
  ["1","5","9"],
  ["3","5","7"]
];
var playedO = [];
var playedX = [];
var computer = [];
var human = [];

//New vars
var moveCount = 0;
var playerMove = "";

//Finish new vars

$("#startBtn").click(function() {
  $("#mainInfo").text("Randomizing first player...");
  setTimeout(function(){
    var firstPlayer = Math.random();
    if (firstPlayer < 0.5) {
      $("#mainInfo").html("CPU goes first!");
      var computerFirst = true;
      computerMoveChk = true;
      playerSymbol = "O";
      firstMoveCpu();
      setTimeout(function(){
        $("#game").show();
      }, 1500);
    } else {
      $("#mainInfo").html("You go first!");
      var computerFirst = false;
      computerMoveChk = false;
      playerSymbol = "X";
      setTimeout(function(){
        $("#game").show();
      }, 1500);
    }
  }, 1500);
});


function firstMoveCpu() {
  moveCount++;
  var possibleFirstMoves = ["1","3","7","9"];
  var computerPlay = possibleFirstMoves[Math.floor(Math.random() * possibleFirstMoves.length)];
  $("#" + computerPlay).html("X");
  var removePossibleMoves = coord.indexOf(computerPlay);
  coord.splice(removePossibleMoves, 1);
  computerMoveChk = false;
  computer.push(computerPlay);
}

function nextMove(playerMove) {
  moveCount++;
  if (moveCount == 3) {
    if (playerMove == 5) {
      if (computer[0] == "1") {
        $("#9").html("X");
        removePossibleMoves = coord.indexOf(9);
        coord.splice(removePossibleMoves, 1);
        computer.push("9");
      } else if (computer[0] == "9") {
        $("#1").html("X");
        removePossibleMoves = coord.indexOf(1);
        coord.splice(removePossibleMoves, 1);
        computer.push("1");
      } else if (computer[0] == "3") {
        $("#7").html("X");
        removePossibleMoves = coord.indexOf(7);
        coord.splice(removePossibleMoves, 1);
        computer.push("7");
      } else {
        $("#3").html("X");
        removePossibleMoves = coord.indexOf(3);
        coord.splice(removePossibleMoves, 1);
        computer.push("3");
      }
    }
  }
  
  computerMoveChk = false;
}








//listen for a click on a table cell and add the chosen symbol to it
  $('td').click(function () {
    moveCount++;
      if (computerMoveChk) {
        $("#mainInfo").html("<p>Wait for the pc</p>"); //checks if the computer is the one that needs to play and does not allow the human to play
      } else {
        var clickedCell = $(this).attr('id'); 
        var valueOnCell = $("#" + clickedCell).html(); //fetches what is currently on the cell clicked
        if (valueOnCell == '') { //checks if the cell is empty and if so
          $(this).text(playerSymbol); //adds the symbol chosen by the player
          human.push(clickedCell);
          var removeNum = coord.indexOf(clickedCell); //finds the location of the cell on the possible moves array
          if (removeNum != -1) {
            coord.splice(removeNum, 1); //removes the number from the array so the computer does not play there
          }
          computerMoveChk = true; //Changes boolean to true to not allow the human to play
          nextMove(clickedCell); //waits 1,5s before triggering the computer move
        } else {
          $("#mainInfo").html("<p>There's already something there</p>"); //if there is something on the cell already it does not allow to play and throws an alert 
        }
      }
  });
 
  
//function to detect if winner exists
  function checkwinner(value, id) {
      if (value === "O") {
      playedO.push(id);
    } else {
      playedX.push(id);
    }   
    for (var i = 0; i < possibleResults.length; i++) {
      if (playedO.indexOf(possibleResults[i][0]) != -1 &&
          playedO.indexOf(possibleResults[i][1]) != -1 &&
          playedO.indexOf(possibleResults[i][2]) != -1) {
        winner = "O";
        resetGame();
      } else if (playedX.indexOf(possibleResults[i][0]) != -1 &&
                 playedX.indexOf(possibleResults[i][1]) != -1 &&
                 playedX.indexOf(possibleResults[i][2]) != -1) {
        winner = "X";
        resetGame();
      }
    }

  }
    
  function resetGame() {
      $("#winnerBanner").text('Winner is ' + winner);
      $("#winnerBanner").slideDown("slow");
      setTimeout(function() {
        $('td').text('');
        playedO = [];
        playedX = [];
        winnerFound = false;
        winner = '';
        $("#game").hide();
        $("#symbolChoice").show();
        $("#winnerBanner").hide();
      }, 3000);
      
  }

});