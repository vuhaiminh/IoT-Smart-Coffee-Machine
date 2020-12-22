For a future 222 student:
Materials you will need:
  Photon Kit
  2 photons and breadboards

# Get Started #
  1. Build your hardware according to the 2 fritz diagrams.
    - Breadboard1 has an LED and a temperature sensor
    - Breadboard2 has a servo motor.
  2. In your browser, please open index.html.
  3. Allow speech on your browser.

# Alarm Feature #
The alarm clock feature is solely handled through the UI using HTML and Javascript.

HTML:
  - Contains form for time input
  - Contains buttons to set time, stop time, and snooze time

Javascript:
  - Calls setTime() function when setTime button is clicked.
    - setTime() function uses Javascript Date object to get current time by hours and minutes.
    - Function is called every second to check time.
    - Function gets value of input time and compares it to current time. When input time equals to current time, an audio mp3 file plays.
  - Calls stopClock() if stop button is clicked. This clears the timeout.
  - Calls snoozeClock() if snooze button is clicked. When called, audio pauses and snoozes for 5 seconds before audio plays again.
    - Cycle essentially repeats itself until stop button is clicked.
  - When stop button is clicked, we perform tasks like room lights On/Off, hear temperature report, and start coffee machine.

# Coffee Machine Starter #
  Javascript:
  - Function makeCoffee() calls makeCoffee of alarm photon.
    - Servo will listen to specific topic of the alarm photon and the servo will change accordingly.
  coffeeRemote.ino:
  - Contains an update remote function. function called when something is change in in alarm because subscribed to topic.
    - In action, servo moves by 20 degrees when called.

# Get Temperature #
Get temp as 2 components.
  1. Get current temperature from temperature sensor.
  2. Get weather prediction and temperature from DarkSky API.

  HTML:
    - Contains get temperature button.
      - When clicked, it calls getCurrentTemp() function in Alarm.JS
      - The function will then call getTemp func in alarm.ino in which will publish the current temperature to the cloud.
        Therefore alarmJS will receive a newState with the updated temperature in it.

  API:
    - We make a fetch request that's passed through a proxy. It returns a JSON type data. The data is parsed for hourly and summary of weather.
      Data is then passed to google API for text to speech.


# Voice Command #
Window speech recognition built in from chrome. This has 2 components
1. interimTranscript - gets result during command within intervals.

2. FinalTranscipt - final result of the sentence spoken. This is will then be able to used to identify the voice command. Ex if final FinalTranscipt contains the words light and on, the alarm will call the function set light power true. Thus the lights will turn on.

#Text To Speech#
HTML:
audio component. Every time text needs to be spoke, text is passed through google translate API. We attribute the source to the API to play it.
