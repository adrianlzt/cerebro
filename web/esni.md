https://blog.cloudflare.com/encrypted-client-hello/

Datos de nuestro navegador
https://crypto.cloudflare.com/cdn-cgi/trace/

Pruebas con firefox Diciembre'21, sigo pudiendo ver el SNI con wireshark.
firefox 95


# Por qué encriptar
Los firewall de capa 7 son capaces de leer esa información y pueden analizar el tráfico o bloquear según el host (es como bloquean los servidores de torrent).


Comprobar si nuestro navegador tiene eSNI activado
https://www.cloudflare.com/es-es/ssl/encrypted-sni/#results


# ECH
Mejora eSNI: https://www.ghacks.net/2021/02/24/the-case-of-the-missing-esni-support-in-firefox-85/
eSNI es vulnerable. por lo que firefox lo ha descartado.


Para activarlo en firefox
Ir a about:config
network.dns.echconfig.enabled = true
network.dns.use_https_rr_as_altsvEn c = true (este parece que viene por defecto)

reiniciar firefox


# eSNI
SNI es una extensión de TLS para enviar el host al que queremos conectar en texto plano, de manera que los balanceadores pueden saber a donde reenviarlo sin necesitar el certificado.
Mirando el "Client hello" de TLS podemos extraer esa información.
Ejemplo en wireshark:
tls.handshake.extensions_server_name_type: host_name
tls.handshake.extensions_server_name: eth0.me

eSNI es SNI encriptado, de manera que no se puede ver esa información.

Para encriptar con SNI se usa una clave almacenada en registros TXT
```
$ dig _esni.crypto.dance TXT +short
"/wGuNThxACQAHQAgXzyda0XSJRQWzDG7lk/r01r1ZQy+MdNxKg/mAqSnt0EAAhMBAQQAAAAAX67XsAAAAABftsCwAAA="
``` 
