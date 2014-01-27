Para servicio web mirar blogtrottr

http://www.allthingsrss.com/rss2email/getting-started-with-rss2email/#unix
Para aplicación: rss2email
  r2e new your@address
  r2e add http://feed.url/somewhere.rss
  r2e run

Crea la configuración en ~/.rss2email
Para configurar el servidor de correo: .rss2email/config.py

# 1: Use SMTP_SERVER to send mail.
# 0: Call /usr/sbin/sendmail to send mail.
SMTP_SEND = 1

SMTP_SERVER = "mail.com:25"
AUTHREQUIRED = 0 # if you need to use SMTP AUTH set to 1
SMTP_USER = 'username'  # for SMTP AUTH, set SMTP username here
SMTP_PASS = 'password'  # for SMTP AUTH, set SMTP password here

DEFAULT_FROM = rss2email@maquina.com
HTML_MAIL = 1
DATE_HEADER = 1


Para enviar un feed a un email
r2e add http://blabla nombre@dominio.com

Muestra los feeds configurados
r2e list 

Borrar un feed
r2d delete <n>

Ejecutar (meter en cron):
r2e run
*/10 * * * * /usr/bin/r2e run
