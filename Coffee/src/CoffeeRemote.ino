
#include <string>


Servo myservo;
const String topic = "cse222/final2";
const String coffeeTopic = "cse222/final_coffeeMachine";
int pos = 0;
int coffeeMade = 0;
// setup() runs once, when the device is first turned on.
void setup() {
  Serial.begin(4800);
  myservo.attach(D0);
  pinMode(D1, INPUT_PULLUP);
  Particle.subscribe("coffee", updateRemote, MY_DEVICES);
  // Particle.function("publishState", publishState);

  // Particle.function("makeCoffee", makeCoffee);
}

const unsigned long debounce = 100;
unsigned long lastButtonPressTime = 0;
bool buttonAlreadyDone = false;
bool buttonActuallyClicked = false;
bool lastButtonPressState = false;
// loop() runs over and over again, as quickly as it can execute.

void loop() {

}


int temp_in_celsius = 0;
int coffee = 0;
void updateRemote(const char *name, const char *data) {

    // put the incoming data (the XML page) into a string called "str"
    String str = String(data);
    Serial.println(str);
    // currentState = str.substring(16,17).toInt();
    // Serial.println(currentState);
    // int shouldMakeCoffee = str.substring(49,50).toInt();
    // Serial.println(shouldMakeCoffee);
    //
    // if(shouldMakeCoffee == 1){
    //   Serial.println("make coffee");
        myservo.write(20);
        delay(500);
        myservo.write(0);


}
// int publishState(String arg){
//   String data = "{";
//   data += "\"coffeeMade\":";
//   data += coffeeMade;
//   data += "}";
//   Particle.publish(topic, data, 60, PRIVATE);
//   return 0;
// }
