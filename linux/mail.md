Para enviar emails: mailx, parece que s-nail lo está sustituyendo.

echo "mensaje" | mail -s "subject" pepe@dest.com

Comprobar que version tenemos de mailx (mail -V)
Nuevo (mi pc) mail v14.9.13
Antiguo (centos 7.2): 12.5


En antiguos, si queremos enviar un email sin pasar por un MTA local y haciendo override de lo que puedan decir los mail.rc:
env MAILRC=/dev/null smtp=server.smtp.com mailx -s "Pruebas sendmail" -r sender@mail.com receptor@mail.cloud <<< "prueba correo con mailx y mta definido"



Para leer los emails:
mutt -f /var/mail/root


# mail
listar emails
h
h 100
f 100-200

Últimos mensajes:
h $

Borrar todos:
d *

# Imap
https://debian-administration.org/article/726/Performing_IMAP_queries_via_curl

Listado de directorios:
curl imaps://USER:PASS@mail.example.com/

Obtener info de un dir:
curl imaps://USER:PASS@mail.example.com/ --request "EXAMINE INBOX"

Obtener el primer email de INBOX:
curl "imaps://USER:PASS@mail.example.com/INBOX;UID=1"
