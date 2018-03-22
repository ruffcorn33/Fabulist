

$(document).ready(function() {
  $(".player-container").hide();

  // created a variable to store the number of players
  var totalPlayers = 0;

  $("#startSubmit").on("click", function(event) {
        event.preventDefault();

        $(".player-container").fadeIn();
        $(".hello").hide();

        var newGame = {
          name: $("#inlineFormInputName").val().trim()
        };
        // number of players
        totalPlayers = $("#numberOfPlayers").val().trim();
        console.log(totalPlayers);

        //posting newGame to the database
        $.post("/api/stories", newGame)
            .done(function(data) {
              console.log(data);
        });
        $("#game-name").val("");

    });

  console.log(totalPlayers);
  var numberOfTurns = 0;
  var nameInput = $("#player-name");
  var emailInput = $("#player-email");
  var playerList = $("tbody");
  var playerContainer = $(".player-container");
      
  $("#startNow").hide();
 
  $(document).on("submit", "#player-form", handlePlayerFormSubmit);



  // A function to handle what happens when the form is submitted to create a new Author
  function handlePlayerFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim()) {
      return;
    }

    upsertPlayer({
      name: $("#player-name")
        .val()
        .trim()
    });
  }

  // A function for creating a player. 
  // Only allowed to create number of players selected
  function upsertPlayer(playerData) {
    if( numberOfTurns < totalPlayers-1){
      var name = $("#player-name").val().trim();
      console.log(name);

      //Should update database??
      $.post("/api/players", playerData)
      
      // Add to number of turns
      numberOfTurns++
      // reset input box to nothing
      $("#player-name").val("");
      // This will create an item in the list
      $("ol").append("<li>" + name + "</li>");
  } else if (numberOfTurns = totalPlayers -1) {
    var name = $("#player-name").val().trim();
      console.log(name);

      //Database - should update last players name?
    $.post("/api/players", playerData)

      // This will create an item in the list
      $("ol").append("<li>" + name + "</li>");
       // reset input box to nothing
      $("#team").hide();
      $("#player-name").hide();
      $("#startNow").fadeIn();
    }
  };
});
  




// ____________________________MODAL___________________________
 // Get the modal
 var modal = document.getElementById('myModal');

 // Get the button that opens the modal
 var btn = document.getElementById("playBtn");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal 
 btn.onclick = function () {
     modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function () {
     modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function (event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
    }
 

  