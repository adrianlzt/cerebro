https://http2.github.io/faq/

Especificación 2.0 en Mayo 2015

La idea es mejorar la responsividad más que añadir nuevas features.

Se mantienen los metodos (GET, POST, etc), Headers, Contents, url-scheme, etc


# Problemas 1.1
## Head on line blocking
http/1.0, hay que hacer las peticiones una a una
http/1.1 pipelining, desactivado por defecto (la idea era hacer varias peticiones simultaneamente que contestaban en orden)
Actualmente, los browsers abren varias conex simultáneamentes. Truco, css, js en dominios distintos para tener más hebras en paralelo


Solución http/2.0
https://http2.github.io/faq/#why-is-http2-multiplexed
conexiones "virtuales" sobre un mismo socket.
Podemos hacer varias peticiones simultáneas de todos los elementos que queramos

## bandwith y excesise round trip
http/1.1 consumo excesivo

Solución http/2.0
https://http2.github.io/faq/#why-is-http2-binary
codificación binaria en frames (HEADERS, DATA, etc)
Sencillez de parseo.
Compresión de cabeceras (HPACK)
Plugin para wireshark: https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=9042

PUSH
https://http2.github.io/faq/#whats-the-benefit-of-server-push
Si el servidor sabe que vas a necesitar un fichero te lo puede enviar sin que lo pidas
No lo soportan muchos servidores.
El browser puede pedir que pare un envio si tiene el fichero ya cacheado.


# TLS
Todos los browsers implementan TLS.
No se parece en nada http2.0 sin TLS con TLS.
