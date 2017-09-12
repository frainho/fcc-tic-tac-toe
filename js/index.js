$(document).ready(function () {
  var playerOps = ["O", "X"];
  var coord = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

//choice of which symbol the player wants to use
var playerSymbol;
var computerSymbol;

//player choses symbol O or X
$("#btnX").click(function() {
  playerSymbol = "X";
  computerSymbol = "O";
  whoGFirst();
  $("#game").show();
});

$("#btnO").click(function() {
  playerSymbol = "O";
  computerSymbol = "X";
  whoGFirst();
  $("#game").show();
});


//randomization of which player starts
function whoGFirst() {
  var firstPlayer = Math.random();
  if (firstPlayer < 0.5) {
    computerMove();
  }
}
//listen for a click on a table cell and add the chosen symbol to it
  $('td').click(function () {
      var idInTable = $(this).attr('id');
      var valueOnCell = $("#" + idInTable).html();
      if (valueOnCell == '') {
        $(this).text(playerSymbol);
        var removeNum = coord.indexOf(idInTable);
        if (removeNum != -1) {
          coord.splice(removeNum, 1);
        }
        if (coord.length == 0) {
          return;
        }
        computerMove();
      } else {
        console.log('illegal move');
      }
      
  });
//random computer move
  function computerMove() {
    var computerPlay = coord[Math.floor(Math.random() * coord.length)];
    $('#' + computerPlay).text(computerSymbol);
    var idInTable = $('#' + computerPlay).attr('id');
    var removeNum = coord.indexOf(idInTable);
    if (removeNum != -1) {
      coord.splice(removeNum, 1);
    }
    if (coord.length == 0) {
      return;
    }
  }

  if (coord.length == 0) {
    console.log('Game finished');
  }
});