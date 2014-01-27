adrian-linux $ adb shell
$ su
# cat /dev/smd0

En otra ventana
adrian-linux $ adb shell
$ su
# echo -e "AT\r" > /dev/smd0

echo -e 'AT+CPMS="ME"\r' > /dev/smd0


Comandos AT:
http://forum.xda-developers.com/showthread.php?t=1471241
http://www.option.com/support/faq/how-to-send-an-sms-with-at-commands-2/


Si necesitamos enviar un control+z

busybox microcom -t 5000 /dev/smd0
Y pulsamos control+z

No se porque no se puede enviar comandos con el microcom
