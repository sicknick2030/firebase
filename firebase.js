var config = {
    apiKey: "AIzaSyAWE9JwKtgWIlk_34zh2YR7rZ43r6RkKr0",
    authDomain: "trainschedule-7a788.firebaseapp.com",
    databaseURL: "https://trainschedule-7a788.firebaseio.com",
    projectId: "trainschedule-7a788",
    storageBucket: "trainschedule-7a788.appspot.com",
    messagingSenderId: "914138509156"
};

firebase.initializeApp(config);

var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  
  var trainName = $("#trainInput").val().trim();
  var trainDestination = $("#destinationInput").val().trim();
  var trainTime = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var trainFrequency = $("#frequencyInput").val().trim();

  
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency,
  };

  
  database.ref().push(newTrain);

  
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  
  alert("Train successfully added");

  
  $("#trainInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;
  var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  var tRemainder = diffTime % trainFrequency;
  var minutesTillTrain = trainFrequency - tRemainder;
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var nextTrainFormatted = moment(nextTrain).format("hh:mm");

  
  console.log("trainName", trainName);
  console.log("trainDestination", trainDestination);
  console.log("trainTime", trainTime);
  console.log("trainFrequency", trainFrequency);
  console.log("trainTimeConverted", trainTimeConverted);
  console.log("currentTime", currentTime);
  console.log("diffTime", diffTime);
  console.log("tRemainder", tRemainder);
  console.log("minutesTillTrain", minutesTillTrain);
  console.log("nextTrain", nextTrain);
  console.log("nextTrainFormatted", nextTrainFormatted);
  
  $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>"
  + trainDestination + "</td><td>" 
  + trainFrequency + "</td><td>" 
  + nextTrainFormatted + "</td><td>"
  + minutesTillTrain + "</td><td>");
});
