
var myParticleAccessToken = "3a0a81a4ed56628c79f4fa61857fd64e8261b8e6"
var myDeviceId =            "31001c000d47373334323233"
var topic =                 "cse222/final2"

// checks for new coffee event
function newEvent(objectContainingData) {

      var obj = JSON.parse(objectContainingData.data);
      coffee.test = obj.test
      console.log("coffee new event");
      console.log(obj)
      // DONE: Publish the state to any listeners
      coffee.stateChange()
}


//coffee object that will handle the status of coffee machine to see if there are changes
var coffee = {

      test: 0,
        testFunction: function(power){
          console.log("hi")
      },

      setStateChangeListener: function(aListener) {
        this.stateChangeListener = aListener;
        this.stateChange();
      },

      stateChange: function() {

        var callingObject = this
        if(callingObject.stateChangeListener) {
          var state = {
              test:this.test,
          };
          callingObject.stateChangeListener(state);
        }
      },
      setup: function() {
      // Create a particle object
      particle2 = new Particle();

      // Get ready to subscribe to the event stream
      function onSuccess(stream) {
        // DONE:  This will "subscribe' to the stream and get the state"
        stream.on('event', newEvent);
        coffee.isLoading = false;
        var functionData = {
             deviceId:myDeviceId,
             name: "publishState",
             argument: "",
             auth: myParticleAccessToken
        }
        function onSuccess(e) { console.log("setup call success")}
        function onFailure(e) { console.log("setup failed")
                               console.dir(e) }

        particle2.callFunction(functionData).then(onSuccess,onFailure)

      }
      function onFailure(e) { console.log("getEventStream call failed")
                              console.dir(e) }


      particle2.getEventStream( { name: topic, auth: myParticleAccessToken, deviceId: myDeviceId }).then(onSuccess, onFailure)


      coffee.stateChange();
    }

}
