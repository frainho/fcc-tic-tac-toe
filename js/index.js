$(document).ready(function () {

var coord = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var playerSymbol;
var computerSymbol;
var computerMoveChk;
var winnerFound = false;
var winner;

//player choses symbol O or X
$("#btnX").click(function() {
  playerSymbol = "X";
  computerSymbol = "O";
  whoGFirst();
  $("#game").show();
  $("#symbolChoice").hide();
});

$("#btnO").click(function() {
  playerSymbol = "O";
  computerSymbol = "X";
  whoGFirst();
  $("#game").show();
  $("#symbolChoice").hide();
});


//randomization of which player starts
function whoGFirst() {
  var firstPlayer = Math.random();
  if (firstPlayer < 0.5) {
    $("#infoBar").html("Computer goes first!");
    computerMoveChk = true;
    setTimeout(computerMove, 1000);
  }
}
//listen for a click on a table cell and add the chosen symbol to it
  $('td').click(function () {
      if (computerMoveChk) {
        $("#infoBar").html("<p>Wait for the pc</p>"); //checks if the computer is the one that needs to play and does not allow the human to play
      } else {
        var idInTable = $(this).attr('id'); //idInTable will be equal to the coordinate of the click in the table
        var valueOnCell = $("#" + idInTable).html(); //fetches what is currently on the cell clicked
        if (valueOnCell == '') { //checks if the cell is empty and if so
          $(this).text(playerSymbol); //adds the symbol chosen by the player
          var valueCell = $("#" + idInTable).html();
          checkwinner(valueCell, idInTable); //calls the winner check function sending in the value of the cell and the coordinate
          var removeNum = coord.indexOf(idInTable); //finds the location of the cell on the possible moves array
          if (removeNum != -1) {
            coord.splice(removeNum, 1); //removes the number from the array so the computer does not play there
          }
          if (coord.length == 0) { 
            //alert("Game Finished"); //if there is no possible moves then alerts that the game finishes. TBD: Check for tie
          }
          computerMoveChk = true; //Changes boolean to true to not allow the human to play
          setTimeout(computerMove, 1500); //waits 1,5s before triggering the computer move
        } else {
          alert('illegal move'); //if there is something on the cell already it does not allow to play and throws an alert 
        }
        if (coord.length == 0) {
          //alert("Game Finished"); //checks again for the moves available.
        }
      }
  });
//random computer move
  function computerMove() {
      var computerPlay = coord[Math.floor(Math.random() * coord.length)]; //randomizes the computer play from the available coordinates
      $('#' + computerPlay).text(computerSymbol); //adds to the cell of the table the symbol
      var idInTable = $('#' + computerPlay).attr('id'); //saves where the computer played TBD: Check for relevance
      var removeNum = coord.indexOf(idInTable); //finds the played coordinate in the array of possible moves
      var valueOnCell = $("#" + idInTable).html(); //saves the symbol of the play to send in the checkwinner function
      var valueCell = $("#" + idInTable).html(); 
      checkwinner(valueCell, idInTable); //calls the winner check function sending in the value of the cell and the coordinate
      if (removeNum != -1) {
        coord.splice(removeNum, 1); //removes the coordinate played from the array of possible moves
      }
      computerMoveChk = false; //allows the computer to play
      //checkwinner(valueOnCell, idInTable);
      if (coord.length == 0) {
        //alert('Game Finished');
      }
    }
  
  var playedO = [];
  var playedX = [];
//function to detect if winner exists
function checkwinner(value, id) {
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