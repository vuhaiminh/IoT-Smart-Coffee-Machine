
var myParticleAccessToken = "e2d0be77bb49347c5944172e74a9d38c41d0ae50"
var myDeviceId =            "290027000a47363339343638"
var topic =                 "cse222/final"

//checks if there's newEvent
function newEvent(objectContainingData) {

      var obj = JSON.parse(objectContainingData.data);
      alarm.lightPowered = obj.lightPowered;
      alarm.currentCelsius = obj.currentCelsius;
      console.log("new alarm event")
      console.log(obj)
      //console.log(alarm)
      // DONE: Publish the state to any listeners
      alarm.stateChange()
    }



// alarm object containing all the functions for our object
var alarm = {
    lightPowered: false,
    currentCelsius: 0,
    // doorPowered: false,
    // light_autoOffEnabled: false,

      setStateChangeListener: function(aListener) {
        this.stateChangeListener = aListener;
        this.stateChange();
      },
      setLightPowered: function(power){
        this.lightPowered = power
        console.log("setLightPower called")
        var arg = "off";
        if(this.lightPowered){
          arg = "on";
        }
        var functionData = {
          deviceId:myDeviceId,
           name: "setLightPower",
           argument: arg,
           auth: myParticleAccessToken
        }
        function onSuccess(e) { console.log("setLightPower call success") }
        function onFailure(e) { console.log("setLightPower call failed")
                             console.dir(e) }
        particle.callFunction(functionData).then(onSuccess,onFailure)
        this.stateChange()
    },

      getCurrentTemp: function(){

        var functionData = {
          deviceId:myDeviceId,
          name: "getTemperature",
          argument: "a",
          auth: myParticleAccessToken
        }
        function onSuccess(e) { console.log("getcurrentTemp call success") }
        function onFailure(e) { console.log("getcurrentTemp call failed")
                            console.dir(e) }
        particle.callFunction(functionData).then(onSuccess,onFailure)
        this.stateChange()
    },
    //manage coffee changes
    makeCoffee: function(){

      var functionData = {
        deviceId:myDeviceId,
        name: "makeCoffee",
        argument: "a",
        auth: myParticleAccessToken
      }
      function onSuccess(e) { console.log("makeCoffee call success") }
      function onFailure(e) { console.log("makeCoffee call failed")
                          console.dir(e) }
      particle.callFunction(functionData).then(onSuccess,onFailure)
      this.stateChange()
  },

// manages state changes
      stateChange: function() {

        var callingObject = this
        console.log("here")
        if(callingObject.stateChangeListener) {
          var state = {

                        lightPowered: this.lightPowered,
                        currentCelsius: this.currentCelsius
                        // doorPowered:this.doorPowered,
                        // light_autoOffEnabled:this.light_autoOffEnabled,
                        // light_autoOffTime:this.light_autoOffTime,
                        // door_autoOffEnabled: this.door_autoOffEnabled,
                        // door_autoOffTime: this.door_autoOffTime,
                        // isLoading: this.isLoading
          };
          callingObject.stateChangeListener(state);
        }
      },
      setup: function() {
      // Create a particle object
      particle = new Particle();

      // Get ready to subscribe to the event stream
      function onSuccess(stream) {
        // DONE:  This will "subscribe' to the stream and get the state"
        console.log("getEventStream success")
        stream.on('event', newEvent);
        alarm.isLoading = false;
        var functionData = {
             deviceId:myDeviceId,
             name: "publishState",
             argument: "",
             auth: myParticleAccessToken
        }
        function onSuccess(e) { console.log("setup call success")}
        function onFailure(e) { console.log("setup failed")
                               console.dir(e) }

        particle.callFunction(functionData).then(onSuccess,onFailure)

      }
      function onFailure(e) { console.log("getEventStream call failed")
                              console.dir(e) }


      particle.getEventStream( { name: topic, auth: myParticleAccessToken, deviceId: myDeviceId }).then(onSuccess, onFailure)


      alarm.stateChange();
    }


}
