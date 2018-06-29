$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCi4XmypV8diM-32w69rWgf8u4oLbK6UlU",
    authDomain: "firstfirebase-c839b.firebaseapp.com",
    databaseURL: "https://firstfirebase-c839b.firebaseio.com",
    projectId: "firstfirebase-c839b",
    storageBucket: "firstfirebase-c839b.appspot.com",
    messagingSenderId: "730664864946"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
console.log('click');

  

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirstTime = $("#first-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    // console.log("FREQUENCY " + trainFrequency);

    // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    
    // Difference between the times
    var diffTime = moment(currentTime).diff(moment(trainFirstTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
     // Time apart (remainder)
     var timeApart = diffTime % trainFrequency;
     console.log(timeApart);
 
    // Minute Until Train
    var minutesTillTrain = trainFrequency - timeApart;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);
 
    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
 
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text((nextTrain).format("HH:mm")),
      $("<td>").text(minutesTillTrain),
     
    );
    $("#train-table > tbody").append(newRow);
    
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTime: trainFirstTime,
      frequency: trainFrequency,
      next: nextTrain,
      minutes: minutesTillTrain
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);
    console.log(newTrain.next);
    console.log(newTrain.minutes);
  
    alert("Train successfully added");
  
    // Clears all of the text-botrain).val("");
    $("#train-name-input").val("")
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
    
   
  });
//   3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().firstTime;
    var trainFrequency = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().next;
    var minutesTillTrain = childSnapshot.val().minutes;
  
    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirstTime);
    console.log(trainFrequency);
    console.log(nextTrain);
    console.log(minutesTillTrain);


   
  

    // var trainFirstTime = $("#first-time-input").val().trim();
    // var trainFrequency = $("#frequency-input").val().trim();
   
    // console.log('FREQUENCY ' + trainFrequency);
    
   
    
     
    });

  });