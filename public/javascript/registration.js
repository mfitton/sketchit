usernameField = $('#username');
usernameSubmitButton = $('#choose-username');

usernameSubmitButton.on('click', function(){
  username = usernameField.val();
  if(validates(username)){
    $.ajax({
      type: "POST",
      url: '/sessions',
      data: {'name': username},
      dataType: 'json',
      success: function(){ console.log('AJAX REQUEST SUCCESSFUL')}
    });
  }
  else{
    console.log('unfortunately, your username is invalid. Make sure it has fewer than 10 characters');
  }
});

function validates(username){
  return (username !== '' && username.length <= 10) ? true : false;
}
