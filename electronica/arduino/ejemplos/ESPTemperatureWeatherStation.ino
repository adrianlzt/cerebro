#include <LiquidCrystal.h>

LiquidCrystal lcd(2, 3, 4, 5, 6, 7);

int errorLED = 11;

String ssid     = "Simulator Wifi";	// SSID to connect to
String password = ""; // Our virtual wifi has no password (so dont do your banking stuff on this network)

String host     = "api.openweathermap.org"; // Open Weather Map API
const int httpPort   = 80;
String uri		 = "/data/2.5/weather?q=San%20Francisco,us&appid=1a702a15a2f46e405e61804cf67c0d30&units=imperial";

// the setup routine runs once when you press reset:
void setup() {
  // Setup LCD and put some information text on there
  lcd.begin(16,2);
  lcd.print("Temperature SF:");
  lcd.setCursor(0,1);
  lcd.print("F: ");
  
  pinMode(errorLED, OUTPUT); // init our red error LED
  
  // Start our ESP8266 Serial Communication
  Serial.begin(115200);		// Serial connection over USB to computer
  Serial.println("AT");		// Serial connection on Tx / Rx port to ESP8266
  delay(10);				// Wait a little for the ESP to respond
  if (!Serial.find("OK")) digitalWrite(errorLED, HIGH);	// check if the ESP is running well
    
  // Connect to 123D Circuits Simulator Wifi
  Serial.println("AT+CWJAP=\"" + ssid + "\",\"" + password + "\"");
  delay(10);				// Wait a little for the ESP to respond
  if (!Serial.find("OK")) digitalWrite(errorLED, HIGH);	// check if the ESP is running well
	
  // Open TCP connection to the host:
  Serial.println("AT+CIPSTART=\"TCP\",\"" + host + "\"," + httpPort);
  delay(50);				// Wait a little for the ESP to respond
  if (!Serial.find("OK")) digitalWrite(errorLED, HIGH);	// check if the ESP is running well

}

// the loop routine runs over and over again forever:
void loop() {
  // Construct our HTTP call
  String httpPacket = "GET " + uri + " HTTP/1.1\r\nHost: " + host + "\r\n\r\n";
  int length = httpPacket.length();
  
  // Send our message length
  Serial.print("AT+CIPSEND=");
  Serial.println(length);
  delay(10); // Wait a little for the ESP to respond
  if (!Serial.find(">")) digitalWrite(errorLED, HIGH); // check if the ESP is running well

  // Send our http request
  Serial.print(httpPacket);
  delay(10); // Wait a little for the ESP to respond
  if (!Serial.find("SEND OK\r\n")) digitalWrite(errorLED, HIGH); // check if the ESP is running well
	
  while(!Serial.available()) delay(5);	// wait until we receive the response from the server

  if (Serial.find("\r\n\r\n")){	// search for a blank line which defines the end of the http header
    delay(5);
    
    unsigned int i = 0; //timeout counter
    String outputString = "";
    
    while (!Serial.find("\"temp\":")){} // find the part we are interested in.
    
    while (i<60000) { // 1 minute timeout checker
      if(Serial.available()) {
        char c = Serial.read();
        if(c==',') break; // break out of our loop because we got all we need
        outputString += c; // append to our output string
        i=0; // reset our timeout counter
      }
      i++;
    }
    
    lcd.setCursor(3,1); // set our LCD cursor to the correct position
    lcd.print(outputString); // push our output string to the LCD
 
  }
  
  delay(10000);	// wait 10 seconds before updating
}
