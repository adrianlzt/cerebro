https://www.bonusbits.com/wiki/HowTo:Configure_SendMail_to_Use_SMTP_Relay

Usar un tercer host para enviar los emails.

/etc/mail/sendmail.mc

Buscar la línea:
dnl define(`SMART_HOST', `smtp.your.provider')dnl

Quitarle el dnl de delante

sendmail va a realizar una resolución inversa de la IP/dominio que pongamos ahí.
Si no tenemos resolución inversa, podemos evitar que sendmail lo haga poniendolo entre corchetes:
dnl define(`SMART_HOST', `[10.0.0.1]')dnl

Al terminar generar la configuración (el sendmail.mk) con:
/etc/mail/make
  en redhat tendremos que tener instalado "sendmail-cf" para poder ejecutar ese make (donde vendrán las templates necesarias)

Reinicar el server
