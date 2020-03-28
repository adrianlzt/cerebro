Será necesario inicializarla:
Serial.begin(115200);

Para escribir en la consola:
Serial.println();
Serial.println("hola");
Serial.print("Connecting to ");



Con cuatro decimales:
Serial.println(speed, 4);



# Leer
if(Serial.available()) {
    char temp = Serial.read();
    if(temp == '+' || temp == 'a')
      calibration_factor += 10;
    else if(temp == '-' || temp == 'z')
      calibration_factor -= 10;
}
