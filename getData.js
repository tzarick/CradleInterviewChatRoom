var desiredUser; // specified user from where to read message

// find message from specified user and display
function findSpecificMessage(response) {
  // alert("FINDmessage");
  var userFound = false;
  // look through messages from most recent to oldest
  for (var i = response.length - 1; i >= 0; i--) {
    if (response[i].username.toLowerCase() === desiredUser.toLowerCase()) {
      $("#textbox").val(function() {
      return "From: " + response[i].username + "\n\n" + response[i].message;
      });
      userFound = true;
      break;
    }
  }
  if (!userFound){
    $("#textbox").val(function() {
    return "No message from '" + desiredUser + "' was found :'(";
    });
  }
}

// submit and post the username and message corresponding to that username
        function submit() {
          var chatMessage = document.getElementById("message").value;
          var username = document.getElementById("username").value;

            $.ajax({
                url: 'http://45.55.230.196:8000/api/entries/',
                data: {
                  "username": username,
                  "message": chatMessage
                },
                type: 'POST',
                success: function(err, response, body) {
                    // alert("HELLO2insideResponse)
                    console.log("successfully posted to chatRoom");

                },
                error: function(error) {
                    console.log(error);
                }
            });
        };
        // load in the message from the desired user and display
        function load() {
          // alert("LOAD");

          desiredUser = $("#textbox").val();

          $.ajax({
              url: 'http://45.55.230.196:8000/api/entries/',
              data: {

              },
              type: 'GET',
              success: function(err, response, body) {
                  console.log("successfully retrieved data from chatRoom");
                  var rawData = body.responseText;
                  var data = JSON.parse(rawData);

                  findSpecificMessage(data);

              },
              error: function(error) {
                  console.log(error);
              }
          });
        }
