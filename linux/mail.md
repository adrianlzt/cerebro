Para enviar emails: mailx

echo "mensaje" | mail -s "subject" pepe@dest.com

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
