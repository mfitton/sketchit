module.exports = function() {
  guessTextBox = $('#guess-box');
  guessSubmitButton = $('#guess-button');
  guessTable = $('#guesses');
  clientName = 'Max';

  guessSubmitButton.on('click', function(e){
    socket.emit('new guess', {'author': clientName, 'message': guessTextBox.val()});
    guessTable.append('<tr class="guess"><td>'+clientName+'</td><td>'+guessTextBox.val()+'</td></tr>');
    console.log('submitting data: '+guessTextBox.val());
    guessTextBox.val('');
  });

  socket.on('new guess', function(data){
    guessTable.append('<tr class="guess"><td>'+data['author']+'</td><td>'+data['message']+'</td></tr>');
    console.log('<tr class="guess"><td>'+data['author']+'</td><td>'+data['message']+'</td></tr>');
  });

  if(verbose) console.log('the guess.js init ran');
  return 1;
}
