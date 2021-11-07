https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/system/log.html
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-log.h

arduino-cli compile --optimize-for-debug --fqbn "esp32:esp32:esp32doit-devkit-v1":DebugLevel=debug .
Parece que así no me deja bajar a verbose

Para poner verbose:
arduino-cli compile --optimize-for-debug --build-property "build.extra_flags=-DCORE_DEBUG_LEVEL=ARDUHAL_LOG_LEVEL_VERBOSE" --fqbn "esp32:esp32:esp32doit-devkit-v1" .


Teóricamente también lo podemos cambiar en runtime, pero al menos esto no me funcionó (tal vez me faltó un include?):
void setup() {
  esp_log_level_set("*", ESP_LOG_VERBOSE);


Para meter nuestras trazas y entender el jaleo de loggers en aduino-esp32
https://thingpulse.com/esp32-logging/
