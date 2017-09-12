$(document).ready(function () {
  var playerOps = ["O", "X"];
  var coord = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

//choice of which symbol the player wants to use
var playerSymbol;
var computerSymbol;
var computerMoveChk;

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
        $("#infoBar").html("<p>Wait for the pc</p>");
      } else {
        var idInTable = $(this).attr('id');
        var valueOnCell = $("#" + idInTable).html();
        if (valueOnCell == '') {
          $(this).text(playerSymbol);
          checkwinner(valueOnCell, idInTable);
          var removeNum = coord.indexOf(idInTable);
          if (removeNum != -1) {
            coord.splice(removeNum, 1);
          }
          if (coord.length == 0) {
            return;
          }
          computerMoveChk = true;
          //checkwinner(valueOnCell, idInTable);
          setTimeout(computerMove, 1500);
        } else {
          console.log('illegal move');
        }
        if (coord.length == 0) {
          console.log('Game finished');
          console.log(playedX);
          console.log(playedO);
        }
      }
  });
//random computer move
  function computerMove() {
    var computerPlay = coord[Math.floor(Math.random() * coord.length)];
    $('#' + computerPlay).text(computerSymbol);
    var idInTable = $('#' + computerPlay).attr('id');
    var removeNum = coord.indexOf(idInTable);
    var valueOnCell = $("#" + idInTable).html();
    checkwinner(valueOnCell, idInTable);
    if (removeNum != -1) {
      coord.splice(removeNum, 1);
    }
    computerMoveChk = false;
    //checkwinner(valueOnCell, idInTable);
    if (coord.length == 0) {
      console.log('Game finished');
    }
  }

  if (coord.length == 0) {
    console.log('Game finished');
    console.log(playedX);
    console.log(playedO);
  }

//function to detect if winner exists
var playedO = [];
var playedX = [];

function checkwinner(value, id) {
 
      if (value === "O") {
      playedO.push(id);
    } else {
      playedX.push(id);
    }
}



});