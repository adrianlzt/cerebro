https://www.c0ffee.net/blog/mail-server-guide
How To Run Your Own Mail Server
https://news.ycombinator.com/item?id=16238937

Running your own email is increasingly an artisanal choice, not a practical one
https://news.ycombinator.com/item?id=29672846

The full setup for inbound mail is - OpenBSD spamd (greylisting) -> internal postfix
Outbound is - internal postfix -> VPS postfix


# Comprobación estado general
https://mxtoolbox.com/SuperTool.aspx


# Seguridad / autenticación

Ejemplo, tenemos una empresa con nuestro propio servidor de correo donde nuetros emails son @corp.com
Si Google recibe un correo de @corp.com (en el "From:" del mensaje), comprobará si el mensaje cumple DKIM (el mensaje está firmado por el servidor) y SPF (el servidor tiene permiso para enviar correos de @corp.com).
En el caso de que no se cumpla DKIM o SPF se aplicará la política definida por DMARC.
Esta política puede ser:
  - dejar pasar el mensaje (p=none)
  - bloquear un porcenataje de los mensajes (p=quarentine)
  - bloquear todos los mensajes (p=reject)
También definiremos un email (del administrador de @corp.com) para que diaríamente Google le envie los emails con los que ha tenido problemas.


## DKIM
https://support.google.com/a/answer/174124?hl=en
https://scaron.info/blog/debian-mail-spf-dkim.html
Como configurar Sender Policy Framework (SPF) y DomainKey Identified Mail (DKIM)

DKIM asegura que un email lo ha enviado un determinado servidor.
El servidor firma el mensaje con una clave privada (esa firma esta en la cabecera del mensaje). La clave pública esta disponible en XXX._domainkey.SUDOMINIO.COM
"XXX" es el campo "s=" de la cabecera que encontramos en el email

Comprobar clave DKIM
host -t TXT CLAVE._domainkey.SUDOMINIO.COM

amavisd -c /etc/amavisd/amavisd.conf testkeys
  si usamos amavis para firmar los emails podemos comprobar con él que la firma pública y privada son válidas

Obtener la clave pública para configurar el DNS
amavisd -c /etc/amavisd/amavisd.conf showkeys nombre.dominio



## SPF
https://es.wikipedia.org/wiki/Sender_Policy_Framework
https://blog.returnpath.com/protecting-your-brand-from-phishing-how-to-create-your-spf-record/

https://www.spfwizard.net/
  herramienta para crear registros SPF

https://mxtoolbox.com/spf.aspx
http://www.kitterman.com/spf/validate.html
host -t TXT docker.com
  herramientas para comprobar registros SPF

Registro para que el receptor de un email sepa si el enviador esta habilitado para enviar email de ese dominio.
Por ejemplo, si delegamos a google.com que envie nuestros emails, tendremos que agregar un registro SPF en nuestro dominio diciendo que permitimos a los servidores de google enviar emails en nuestro nombre.

Debemos registrar en nuestro server DNS las máquinas que enviaran correos:
midominio.com. IN TXT "v=spf1 mx ptr ~all"

v= define la versión usada de SPF (versión 1).
mx autoriza a las máquinas con la IP de los registros MX.
ptr autoriza a las máquinas bajo el dominio midominio.com.
~all sugiere desautorización a las máquinas que no encajen en lo autorizado explícitamente.


dominio.com.  IN TXT "v=spf1 mx -all"
  permite solo a los servidores MX de dominio.com a enviar emails como @dominio.com


NOTA IPv6:
Si tenemos ipv6, meter también las IPs de nuestro rango ipv6 a SPF
mirar el "Mensaje original" en un email enviado a Google. Nos dirá si pasa SPF, DKIM y DMARC.




## DMARC
https://dmarc.org/

Es el método que tenemos para saber si las reglas DKIM/SPF están funcionando correctamente.
Ciertos servidores (google, yahoo, etc) envian un reporte cada 24h con correos enviados usando nuestro dominio pero que no cumplieron SPF o DKIM (suponiendo que somos un servidor que envia correos).


A DMARC policy allows a sender to indicate that their messages are protected by SPF and/or DKIM, and tells a receiver what to do if neither of those authentication methods passes – such as junk or reject the message. DMARC removes guesswork from the receiver’s handling of these failed messages, limiting or eliminating the user’s exposure to potentially fraudulent & harmful messages. DMARC also provides a way for the email receiver to report back to the sender about messages that pass and/or fail DMARC evaluation.

There is one service, DMARC[1], that is free and can give you some visibility into how email from your domain is being processed. I put the txt record in my DNS, and Google, Facebook, Comcast, Yahoo, Fastmail, and a few others send me reports about email they have processed from my domain. It's not that interesting at the moment because things are working, but it might help to debug issues if your email was being rejected. At least I see a few spammers are trying to use my domain from their servers.


https://support.google.com/a/answer/2466580
Que hacer un correo si falla la comprobación DKIM o SPF.

https://support.google.com/a/answer/2466563?hl=en
formato de la entrada dmarc

Comprobar configuración:
host -t TXT _dmarc.docker.com


Crear el registro DMARC: https://blog.returnpath.com/demystifying-the-dmarc-record/
Ejemplo de registro TXT:
"v=DMARC1; p=quarantine; pct=5; rua=mailto:postmaster@your_domain.com"

p= puede tener los valores:
  none
  quarantine
  reject

aspf/adkim, pueden ser strict o relaxed (default). relaxed permite pasar también los subdominios.

Comenzar con una configuración donde dejamos pasar todos los errores, e ir pasando a un pequeño porcentaje de cuarentena, casi todo en cuarentena, porcentaje descartado, todo descartado.

El envio de emails tiene que ser a un correo con el mismo dominio.

Ver human friendly los reportes que nos envien: https://dmarcian.com/dmarc-xml/

## Reportes DMARC
Hay dos tipos de reportes: agregados y forensic

### Aggregate
https://blog.returnpath.com/how-to-read-your-first-dmarc-reports-part-1/
https://stackoverflow.com/questions/41919848/understand-dmarc-email-record
https://stackoverflow.com/questions/30962169/dmarc-spf-and-dkim-record-queries?rq=1

En los reportes vendrá:
  - quien lo envia (report_metadata)
  - la política DMARC que tenemos configurada (policy_published)
  - varias entradas con los emails servidores que han enviado emails con nuestro dominio
    - row:
      - source_ip: ip del enviador
      - count: número de emails recibidos
      - policy_evaluated: políticas evaluadas (DKMI y/o SPF) y que política DMARC se aplicó (disposition).
        Se chequea alineamiento, que el "From:" y "MAIL FROM" sean el mismo dominio.
        Y para DKIM parece que chequea que el "From:" matchea la entrada d= del registro DKIM
    - identifiers: parece que es como se seleccionó que este correo era de nuestro dominio
    - auth_results: resultados de DKIM / SPF para el servidor que envió el correo. Aquí parece que se chequea el "MAIL FROM"
      - en spf parece que nos pone el/los dominios para los que la IP que ha enviado el correo tiene permiso de envio
      - en dkim no me queda claro que chequea


## Forensic
https://blog.returnpath.com/how-to-read-your-first-dmarc-reports-part-2/

Los activamos poniendo en el registro TXT:
ruf=mailto:domain@example.com




# Varios
https://news.ycombinator.com/item?id=14201562
Discusion sobre como configurar un servicio de email


https://www.rackaid.com/blog/email-dns-records/
Registros DNS que debebemos tener bien configurados si queremos que no rechacen nuestros correos
