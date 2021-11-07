Returns the number of milliseconds passed since the Arduino board began running the current program

CUIDADO! This number will overflow (go back to zero), after approximately 50 days.
  4294967295 ms ➞ d = 49.7103 d

time = millis()



Generalmente no hace falta gestionar el overflow, mirar https://arduino.stackexchange.com/questions/33572/arduino-countdown-without-using-delay/33577#33577
