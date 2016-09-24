https://www.howtoforge.com/tutorial/configure-postfix-to-use-gmail-as-a-mail-relay/

# Arch
sudo pacman -Sy postfix mailutils

sudo vi /etc/postfix/sasl_passwd
[smtp.gmail.com]:587    username@gmail.com:password

sudo chmod 600 /etc/postfix/sasl_passwd

Añadir al final del fichero:
sudo vi /etc/postfix/main.cf
relayhost = [smtp.gmail.com]:587
smtp_use_tls = yes
smtp_sasl_auth_enable = yes
smtp_sasl_security_options =
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_tls_CAfile = /etc/ssl/certs/ca-certificates.crt


sudo postmap /etc/postfix/sasl_passwd

sudo systemctl restart postfix


Tenemos que activar las aplicaciones poco seguras:
https://support.google.com/accounts/answer/6010255

echo "prueba de mensaje" | mail -s "prueba de correo" unemail@mail.com

Mirar log:
journalctl
