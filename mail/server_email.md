The full setup for inbound mail is - OpenBSD spamd (greylisting) -> internal postfix
Outbound is - internal postfix -> VPS postfix


# Comprobación estado general
https://mxtoolbox.com/SuperTool.aspx


# Seguridad / autenticación

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



## DMARC
https://support.google.com/a/answer/2466580
Que hacer un correo si falla la comprobación DKIM o SPF.

Comprobar configuración:
host -t TXT _dmarc.docker.com

Comenzar con una configuración donde monitorizamos todos los errores, e ir pasando a un pequeño porcentaje de cuarentena, casi todo en cuarentena, porcentaje descartado, todo descartado.



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




# Varios
https://news.ycombinator.com/item?id=14201562
Discusion sobre como configurar un servicio de email


https://www.rackaid.com/blog/email-dns-records/
Registros DNS que debebemos tener bien configurados si queremos que no rechacen nuestros correos
