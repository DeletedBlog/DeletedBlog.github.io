var bcrypt = require('bcryptjs');

$(document).ready(function(){
//Above function runs this code on HTML startup
$('#getPass').keypress(function(e){
      if(e.keyCode==13)
      $('#button').click();
});
//above function clicks when enter is pressed
//Below function runs this code on button click
$("#button").click(function(){
    function empty() {
      $("#textbox").empty();
    }
    function passEmpty() {
      $("#getPass").empty();
    }
    var typedpass = $("#getPass").val();
    var typedname = $("#username").val();
    //Get username and password from input
    if (typedpass === "" || typedname === "") {
      empty();
      $("#textbox").append("Please enter a username and password");
      setTimeout(empty, 5000);
      return;
    }
    //returns if there is nothing in a textbox
    var passwords = {"chatsup-tristan":"$2a$06$AcWYcGgAaqUacPqPT1vQNebdxFUwNM32lYf8MWEp1vIFUMMsH91YG"};
    var reqpass = passwords[typedname];
    //Gets hashed password from database using username
    try{
      correct = bcrypt.compareSync(typedpass, reqpass);
    }
    catch(err) {
      empty();
      $("#textbox").append("Incorrect Username or Password");
      setTimeout(empty, 5000);
      return;
    }
    //Compares the typed password with hashed password, and if there is an error, it will state that the username or password is incorrect.
    if (correct) {
      empty();
      $("#textbox").append("Login Successful");
      setTimeout(empty, 5000);
      window.location = "Chatsup.html";
    }else if (!correct) {
      empty();
      $("#textbox").append("Incorrect Username or Password");
      setTimeout(empty, 5000);
    }
    //Displays password correct or incorrect, then removes text after 5 seconds
  });
});
