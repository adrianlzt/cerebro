http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-Zero-2W.html
http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-Pi-Zero-2W.html

Otra empresa fabricando un equivalente, más potente, de la pizero 2w

Manual: https://drive.google.com/drive/folders/1KIZMMDBlqf1rKmOEhGH7_7A-COAgYoGZ


Bastantes problemas para echar a andar la tarjeta. Probando combinaciones de tarjetas, OS, flasheadores, etc.
Finalmente lo que me funcionó fue:
Orangepizero2w_1.0.0_debian_bullseye_server_linux5.4.125.img
Flasheado con balena-etcher usando un adaptador de microsd a tarjeta sd.
La tarjeta es una SanDisk extreme plus 32GB.

La de arch también funciona, pero sin HDMI
Opios-arch-aarch64-xfce-opizero2w-23.09-linux6.1.31-4gb.img
Con balena-etcher, adaptador usb-microsd y SanDisk extreme plus 32GB.
Le conecté el adaptador usbc-ethernet y podía hacer ping.
Hace falta modificar la imagen para permitir ssh con password o meter nuestra clave ssh pública.
Usuario "oem"

Orangepizero2w_1.0.0_debian_bookworm_server_linux6.1.31-4gb.7z
Esta versión, flasheando con balena usando el adaptador usb-microsd no me funciona.

En reddit un usuario me contesta que el problema puede ser simplemente el vídeo, que headless funciona.


El debug via puerto serie no me funcionó. Tal vez los cables no hacían buena conex con la placa.
