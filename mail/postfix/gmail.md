https://www.linode.com/docs/email/postfix/configure-postfix-to-send-mail-using-gmail-and-google-apps-on-debian-or-ubuntu

# Arch
sudo pacman -Sy postfix mailutils

Para poder meter una contraseña de aplicación (en vez la nuestra real), tenemos que activar el 2 factor auth.

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


echo "prueba de mensaje" | mail -s "prueba de correo" unemail@mail.com

Mirar log:
journalctl -u postfix -f
