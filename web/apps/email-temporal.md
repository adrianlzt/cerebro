http://temp-mail.org/es/
https://www.mailinator.com/  permite recibir correos antes de generar el correo
https://10minutemail.com/

# Temp-mail

API
https://temp-mail.org/es/api

Parece que si intentamos realizar muchas peticiones a la API seguidas las empieza a dropear

Hay integraciones para bastantes lenguajes

# Python
pip install temp-mail

from tempmail import TempMail

tm = TempMail()
print("Email: %s" % tm.get_email_address())
print(tm.get_mailbox())

>>> print(tm.get_mailbox()) 
[{u'mail_from': u'Quien Envia <enviandor@gmail.com>', u'mail_timestamp': 1461330324.63, u'mail_html': u'<div dir="ltr">a ver que dice</div>\n', u'mail_preview': u'...', u'mail_text': u'a ver que dice\n', u'mail_subject': u'prueba desde gmail', u'mail_id': u'92809ac7b1e247df8d37231972b2ab2e', u'mail_text_only': u'<div dir="ltr">a ver que dice</div>\n', u'_id': {}, u'createdAt': {}, u'mail_address_id': u'c1d3102cb490431320c0af4dc54f89b3'}]

Los emails duran como 1h en la bandeja de entrada (aunque en la web dicen 10').
La dirección de correo si que parece permanente.

Puedo enviar un email a una dirección inexistente, y luego preguntar a la api que me de los emails de esa dirección.
En plan simple puedo hacer:
TempMail(login="login_inventado").get_mailbox()

Si queremos una direccción específica:
login = TempMail().generate_login()
dominio = TempMail().available_domains.pop()
tm = TempMail(login=login, domain=dominio)
