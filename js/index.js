$(document).ready(function () {
  var playerOps = ["O", "X"];
  var coord = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

//choice of which symbol the player wants to use
var playerSymbol;
var computerSymbol;

$("#btnX").click(function() {
  playerSymbol = "X";
  computerSymbol = "O";
  whoGFirst();
});

$("#btnO").click(function() {
  playerSymbol = "O";
  computerSymbol = "X";
  whoGFirst();
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
      $(this).text(playerSymbol);
      var idInTable = $(this).attr('id');
      var removeNum = coord.indexOf(idInTable);
      if (removeNum != -1) {
        coord.splice(removeNum, 1);
      }
      if (coord.length == 0) {
        console.log('Game finished');
        return;
      }
      computerMove();
  });

  function computerMove() {
    console.log(computerSymbol);
    var computerPlay = coord[Math.floor(Math.random() * coord.length)];
    $('#' + computerPlay).text(computerSymbol);
    var idInTable = $('#' + computerPlay).attr('id');
    var removeNum = coord.indexOf(idInTable);
    if (removeNum != -1) {
      coord.splice(removeNum, 1);
    }
    if (coord.length == 0) {
      console.log('Game finished');
      return;
    }
  }

  if (coord.length == 0) {
    console.log('Game finished');
  }
});