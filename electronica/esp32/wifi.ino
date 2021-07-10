#include <WiFi.h>

const char* ssid = "NOMBRE_RED";
const char* password = "password red";

void setup()
{
  Serial.begin(115200);
  Serial.println();

  WiFi.begin(ssid, password);

  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  delay(1000);
  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());
}
