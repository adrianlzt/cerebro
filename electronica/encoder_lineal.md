En aliexpress los venden baratos.
El problema es que parece que su límite de velocidad es 1m/s, que podría ser superado por alguien haciendo dominadas muy rápido.
https://es.aliexpress.com/item/4001106636739.html

Otro por 100€
https://www.aliexpress.com/snapshot/0.html?orderId=8126014286858981
Imagen con las intrucciones, en chino, con notas mias: encoder_lineal_aliexpress.jpg

cable marrón: positivo
cable azul: negativo
cable negro: señal


De un proyecto midiendo con el ADC del esp32.
Al medir la variación del voltaje según la posición obtenemos la recta:
y = -0,000463 * V + 1,7541

Los 11.5 primeros cm son ciegos (devuelven el valor máximo, 4095).

Al realizar medidas en el rango 50-150cm tiene un error de +-2cm

