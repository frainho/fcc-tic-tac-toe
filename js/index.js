$( document ).ready(function() {
  var playerOps = ["O", "X"];
  var coord = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  

  $('td').click( function(){
    $(this).text("X");
    var idInTable = $(this).attr('id');
    console.log(idInTable);
    var removeNum = coord.indexOf(idInTable);
    console.log(removeNum);
    if (removeNum != -1) {
      array.splice(removeNum, 1);
    }
    console.log(coord);
  }); 
  function computerMove() {
  }
});