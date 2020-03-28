https://arduino-esp8266.readthedocs.io/en/latest/

Macros definidas para nodemcu
https://github.com/esp8266/Arduino/blob/1d052834a4c27c8eecc9f8b5ccc0e9e67d537ba6/variants/nodemcu/pins_arduino.h
Podemos usar directamente las macros D1, D2, etc


Ejemplo de parpadeo del pin integrado.
LED_BUILTIN está definido en las macros de pins_arduino.h descrito arriba


void setup() {
  pinMode(LED_BUILTIN, OUTPUT);    // sets the digital pin as output
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH); // sets the LED on
  delay(1000);                // waits for a second
  digitalWrite(LED_BUILTIN, LOW);  // sets the LED off
  delay(1000);                // waits for a second
}
