Para enviar emails: mailx

Para leer los emails:
mutt -f /var/mail/root


# Imap
https://debian-administration.org/article/726/Performing_IMAP_queries_via_curl

Listado de directorios:
curl imaps://USER:PASS@mail.example.com/

Obtener info de un dir:
curl imaps://USER:PASS@mail.example.com/ --request "EXAMINE INBOX"

Obtener el primer email de INBOX:
curl "imaps://USER:PASS@mail.example.com/INBOX;UID=1"
