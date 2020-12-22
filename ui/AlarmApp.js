
// document.getElementById('btnGiveCommand').addEventListener('click', function(){
// 	recognition.start();
// });
var alarmGoesOff = false;
var wantCoffee = false;
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let finalTranscript = '';
let recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.maxAlternatives = 10;
recognition.continuous = true;
recognition.onresult = (event) => {
let interimTranscript = '';

// loops through for continuous listening for voice commands
for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
  let transcript = event.results[i][0].transcript;

  if (event.results[i].isFinal) {
		console.log(transcript)
    finalTranscript += transcript;
    if(transcript.includes("light") && transcript.includes("on")){
			alarm.setLightPowered(true)
		}
		if(transcript.includes("light") && transcript.includes("off")){
			alarm.setLightPowered(false)
		}
    if(transcript.includes("what") && transcript.includes("temperature")){
      console.log("get temperature");
      getTempuratureFunction()
    }
    if(transcript.includes("snooze") && alarmGoesOff){
			snoozeClock()
		}

    if(transcript.includes("stop") && alarmGoesOff){
      stopClock()


    }
    if(transcript.includes("yes") && wantCoffee){
      console.log("want coffee!!!")
      var url = "http://translate.google.com/translate_tts?tl=en&q=Sure&client=tw-ob";
      $('audio').attr('src', url).get(0).play();
      wantCoffee = false
      makeCoffeeFunction()
    }
  }
// appends everything said together
  else {
    interimTranscript += transcript;
  }

  }
}
//starts the process of listening for voice commands
recognition.start();

// ------- shows and hides pages ------
var coffeeBox = false;

function showAdvanced(){
  let advanced_page = document.getElementById("container2")
  let main_page = document.getElementById("container1")
  main_page.hidden = true
  advanced_page.hidden = false
}

function showMain(){
  let advanced_page = document.getElementById("container2")
  let main_page = document.getElementById("container1")
  main_page.hidden = false
  advanced_page.hidden = true
}

//audio initialized for alarm sound when alarm goes off
var sound = new Audio('Boop.mp3');
var timer = 0
var timer2 = 0

function setTime(){
  var today = new Date();
  var currentHour = today.getHours();
  var currentMin = today.getMinutes();

//make sure single digit times will have a 0 in front of it.
  if (currentHour.toString().length == 1) {
    currentHour = "0" + currentHour;
  }
  if (currentMin.toString().length == 1) {
    currentMin = "0" + currentMin;
  }

  var currentTime = currentHour + "." + currentMin
  // gets value of input time and spits it for reading.
  var clock = document.getElementById("clockTime").value

  var time = clock.split(":");
  var hour = time[0];
  var min = time[1];
  // var min2 = +time[1] + +1;

  var inputTime = hour+"."+min;
  // var inputTime2 = hour+"."+ min2;
  //|| (String(inputTime2) === String(currentTime))

  //---------------checks to see if time matches before playing audio-------
  if (String(inputTime) === String(currentTime)) {
    document.getElementById("stop").addEventListener("click", stopClock)
    document.getElementById("snooze").addEventListener("click", snoozeClock)
    alarmGoesOff = true;
    sound.play();
  }
  timer = setTimeout(setTime, 1000);
}
var flag = false;

// -------- stops timer and audio and performs functionality ---------
function stopClock(){
	console.log("stop called")
  flag = false;
  sound.pause();
  timeOff()
  // do EVERYTHING here after stop alarm (tell temp, start coffee)
	var url = "http://translate.google.com/translate_tts?tl=en&q=Good%20morning%20&client=tw-ob";
	$('audio').attr('src', url).get(0).play();
	setTimeout(function () {
    getTempuratureFunction()
	}, 1000);
  setTimeout(function(){ getWeatherAPI() }, 4000);

  setTimeout(function () {
    var likeCoffee = "Would you like some coffee?"
    encodeURIComponent(likeCoffee)
    var url = "http://translate.google.com/translate_tts?tl=en&q=" + likeCoffee + "&client=tw-ob";
    $('audio').attr('src', url).get(0).play();

  }, 9000);
  wantCoffee = true;
  alarmGoesOff = false;

}

// -------- snooze timer and audio continuously. Audio starts again after 5 seconds until stopped ---------
function snoozeClock(){
  var url = "http://translate.google.com/translate_tts?tl=en&q=Snoozing&client=tw-ob";
	$('audio').attr('src', url).get(0).play()
  sound.pause()
  timeOff()
  setTimeout(function () {
    clockAgain()
    }, 5000);
}

function clockAgain(){
  sound.play()
  document.getElementById("stop").addEventListener("click", stopClock)
  timer2 = setTimeout(clockAgain, 1000);
}

function timeOff(){
  clearTimeout(timer);
  clearTimeout(timer2)
}

// function giveCommand(){
//
// 	var message = document.getElementById("message");
// 	var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// 	var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
// 	var grammar = '#JSGF V1.0;'
// 	var recognition = new SpeechRecognition();
// 	var speechRecognitionList = new SpeechGrammarList();
// 	speechRecognitionList.addFromString(grammar, 1);
// 	recognition.grammars = speechRecognitionList;
// 	recognition.lang = 'en-US';
// 	recognition.interimResults = false;
// 	recognition.onresult = function(event) {
// 		var last = event.results.length - 1;
// 		var command = event.results[last][0].transcript;
// 		message.textContent = 'Voice Input: ' + command + '.';
// 		console.log(command)
// 		if(command.includes("light") && command.includes("on")){
// 			alarm.setLightPowered(true)
// 		}
// 		if(command.includes("light") && command.includes("off")){
// 			alarm.setLightPowered(false)
// 		}
//
// 	};
// 	recognition.onspeechend = function() {
// 		recognition.stop();
// 	};
// 	recognition.onerror = function(event) {
// 		message.textContent = 'Error occurred in recognition: ' + event.error;
// 	}
// 	recognition.start()
// }

var cur_temp = 0

// function to play back temperature when button from UI is pressed
function getTempuratureFunction(){
	alarm.getCurrentTemp()
	console.log("getTemp call")
	// var text = "Current Temperature is"
	// text = encodeURIComponent(text)
	var url = "http://translate.google.com/translate_tts?tl=en&q=current%20tempurature%20is%20"+ cur_temp+ "%20Celsius" + "&client=tw-ob";
	$('audio').attr('src', url).get(0).play();
	//getWeatherAPI()
	//setTimeout(function(){ getWeatherAPI() }, 3000);
}


// updates the state with newstate
function stateUpate(newState){

	console.log("call state update " + newState.currentCelsius);
	cur_temp = newState.currentCelsius

}

//fetches from darksky API for weather info
function getWeatherAPI(){

	let proxy = "https://cors-anywhere.herokuapp.com/"
	var api = proxy + 'https://api.darksky.net/forecast/88c6d6c5a7bc6b72a6c0e0d7ffa00f30/38.6270,-90.1994'
	fetch(api)
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
		var url = "http://translate.google.com/translate_tts?tl=en&q=Today%20forcast%20is%20"+ encodeURIComponent(data.hourly.summary) + "&client=tw-ob";
		$('audio').attr('src', url).get(0).play();

  })
  .catch(err => {
    console.log("error")
  })

}

// calls function from alarm object
function makeCoffeeFunction(){
		alarm.makeCoffee()
}


// --------all eventListeners------
window.addEventListener("load", function(event){


var getTempButton = document.getElementById("getTemp")
getTempButton.addEventListener("click", getTempuratureFunction)

var getWeatherApiButton = document.getElementById("getWeatherAPI")
getWeatherApiButton.addEventListener("click", getWeatherAPI)

var makeCoffeeButton = document.getElementById("makeCoffee")
makeCoffeeButton.addEventListener("click", makeCoffeeFunction)

// var getCommand = document.getElementById("btnGiveCommand")
// getCommand.addEventListener("click", giveCommand)
// var stopButton = document.getElementById("stop")
// stopButton.addEventListener("click", stopClock)

var setTimeButton = document.getElementById("setTime")
setTimeButton.addEventListener("click", setTime)

// var snoozeButton =   document.getElementById("snooze")
// snoozeButton.addEventListener("click", snoozeClock)



alarm.setStateChangeListener(stateUpate)
alarm.setup()
// coffee.setStateChangeListener(stateUpate)
//
// coffee.setup()
})
