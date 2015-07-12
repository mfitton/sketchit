module.exports = function() {
  guessTextBox = $('#guess-box');
  guessSubmitButton = $('#guess-button');
  clientName = 'Max';
  guessSubmitButton.on('click', function(e){
    socket.emit('new guess', {'author': clientName, 'message': guessTextBox.val()});
    console.log('submitting data: '+guessTextBox.val());
    guessTextBox.val('');
  });
  console.log('the guess.js init ran');
  return 1;
}
