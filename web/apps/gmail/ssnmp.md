http://cfenollosa.com/misc/tricks.txt

Enviar emails desde el terminal con gmail:

sudo apt-get install ssmtp

Configure your /etc/ssmtp/ssmtp.conf:
root=***E-MAIL***
mailhub=smtp.gmail.com:587
rewriteDomain=
hostname=smtp.gmail.com:587
UseSTARTTLS=YES
UseTLS=YES
AuthUser=***E-MAIL***
AuthPass=***PASSWORD***
AuthMethod=LOGIN
FromLineOverride=YES

* ssmtp can use a Gmail account as SMTP and send emails from the command line.
echo "Hello, User!" | mail user@domain.com -s subject


Con esto también conseguiremos recibir el email dirigido a root en el correo de gmail.
