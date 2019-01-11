https://www.linode.com/docs/email/postfix/postfix-smtp-debian7

Pasar los mensajes de correo a un tercer servidor que se encargará de enviar los emails.

vi /etc/postfix/main.cf
relayhost = servidor.de.correo.com

