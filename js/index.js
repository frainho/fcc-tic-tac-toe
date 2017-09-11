$( document ).ready(function() {
  var playerOps = ["O", "X"];
  var coord = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  

  $('td').click( function(){
    $(this).text("X");
    let idInTable = $(this).attr('id');
    let removeNum = coord.indexOf(idInTable);
    console.log(removeNum);
    if (removeNum != -1) {
      coord.splice(removeNum, 1);
    }
    console.log(coord);
    if (coord.length == 0) {
      console.log('Game finished');
      return;
    }
    computerMove();
  });
  
  function computerMove() {
  let computerPlay = coord[Math.floor(Math.random()*coord.length)];
  $('#' + computerPlay).text("O");
  let idInTable = $('#' + computerPlay).attr('id');
  let removeNum = coord.indexOf(idInTable);
  console.log(removeNum);
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