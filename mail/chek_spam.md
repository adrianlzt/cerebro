https://news.ycombinator.com/item?id=10405681
Varias historias de gente con pequeñas empresas que les resulta muy dificil mantener un servidor de correo.
Técnicas de como montar tu server para poder enviar.
De como filtrar para no recibir SPAM.
etc


http://liminality.xyz/the-hostile-email-landscape/
historia de los problemas que tuvo uno para tener su propio server de correo.


https://www.mail-tester.com/
Enviando un correo a una dirección que nos dan se comprueba como de "spammy" somos.

Nos da varios datos, entre ellos las putuaciones del SpamAssasin, explicando que es cada una.
Nos muestra los resultados en una web bastante currada.


https://www.port25.com/support/authentication-center/email-verification/
Servicio parecido, pero nos contesta en el email


http://www.senderbase.org/lookup/
Mirar si nuestro rango está en alguna black list


DMARC
There is one service, DMARC[1], that is free and can give you some visibility into how email from your domain is being processed. I put the txt record in my DNS, and Google, Facebook, Comcast, Yahoo, Fastmail, and a few others send me reports about email they have processed from my domain. It's not that interesting at the moment because things are working, but it might help to debug issues if your email was being rejected. At least I see a few spammers are trying to use my domain from their servers.
[1] https://dmarc.org/


Once upon a time, to send email, you needed to use SMTP. Now, you must use SMTP, from a IP block that isn't categorized as residential, and which has never before had any association with outgoing spam, and you also must implement several ad-hoc identification protocols like SPF and reverse DNS. You should also use a domain name that you've owned for some time and which is not expiring soon. Every system to which you want to send mail will give different weights to all these signals. If they don't like you, their behavior is to report successful delivery and then silently hide messages from their intended recipients.



# Cosas que se chequean
SPF, SenderID, DomainKeys, DKIM and Spamassassin.

Sender Policy Framework (SPF) es un sistema de validación de correos diseñado para prevenir los correos no deseados detectando el spoofing de correos, una vulnerabilidad común, mediante la verificación de la dirección IP del remitente.

DomainKeys Identified Mail (DKIM) es un método para asociar un nombre de dominio a un mensaje, por lo tanto permitiendo a una persona u organización responsabilizarse del mensaje.

Sender ID es como SPF, pero comprueba la dirección del remitente, no la dirección de rebote.

Mirar spf.md


# Gmail
Si recibimos correos en Gmail podemos ver que dice la cabecera "Authentication-Results:" en el correo para ver que opina GMail.
