/*
Same as default flicker program but flicker speed is controlled by USB input.
*/

int n;//light flicker speed multiplier

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);

}

void loop() {
  if(Serial.available()>0){//checks if there is data to be read
    n = Serial.read();
    Serial.println("debug");

    Serial.println(n);
  }
}
