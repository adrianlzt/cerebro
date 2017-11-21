# MX
Cuando queremos enviar un email a un usuario deberemos resolver su registro dns tipo MX:
host -t MX server.com

Conectaremos por SMTP a ese servidor y le enviaremos el email.
En caso de no tener registro MX conectaremos directamente con el servidor que tenga ese nombre.



# Curl
https://ec.haxx.se/usingcurl-smtp.html

curl smtp://mail.example.com --mail-from myself@example.com --mail-rcpt receiver@example.com --upload-file email.txt

Enviar email con auth usando SSL y con verbose:
curl smtp://mail.com --mail-from no_reply@origen.com --mail-rcpt destino@gmail.com --upload-file email.txt -v --ssl -k -u USER:PASS


# Telnet / nc / plano
http://www.yuki-onna.co.uk/email/smtp.html
Enviar un correo usando protocolo de texto plano.

HELO prueba_adrian
MAIL FROM: sender@mail.com
RCPT TO: receiver@mail.com
DATA
From: "Name Surname sender" <sender@mail.com>
Date: Mon, 24 Oct 2016 08:38:21 +0000
Subject: Enviando correo desde el server de tid
To: "Name surname receiver" <receiver@mail.com>

Este es un email que envio desde el servidor de correo de telefonica.

Envio el correo a gonzalo, a su cuenta de amaris
.
QUIT
