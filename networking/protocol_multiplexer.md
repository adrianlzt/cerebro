Con iptables en principio parece que no se puede, porque si queremos usar PREROUTING para decidir donde enviar el tráfico, se tomará la decisión consultando únicamente el primer paquete de la conexión, donde aun no sabemos que tipo de tráfico vamos a usar.


# Go
https://github.com/jamescun/switcher
Multiplexa protocolos.
Lo que hace es examinar los primeros bytes de la cabecera del paquete que va encima de TCP y decidir que protocolo es.
Luego copia el resto del tráfico hacia, y desde, ese puerto.

Es muy sencillo implementar el descubrimiento de otros protocolos.

Por ejemplo, para descubrir TLS:
// TLS packet starts with a record "Hello" (0x16), followed by version (0x03 0x00-0x03) (RFC6101 A.1)
// Reject SSLv2 and lower versions (RFC6176):
if header[0] == 0x16 && header[1] == 0x03 && (header[2] >= 0x00 && header[2] <= 0x03) {


# C
https://github.com/yrutschle/sslh
Correr varios servicios (ssh, http, etc) en un mismo puerto.

Según se recoge en su readme, su funcionamiento no es muy eficiente.
Tiene una variante que forkea por cada nueva conex (muy costoso).
Y otra, menos probada, que usa select.
En cualquiera de los dos casos, ante muchas conex se satura.

Ejemplo para escuchar en el puerto 6999 y reenviar tráfico TLS al puerto 6380 y el restante a 6379

verbose: true;
foreground: true;
numeric: true;

listen:
(
  { host: "0.0.0.0"; port: "6999"; }
);

protocols:
(
  { name: "tls"; host: "localhost"; port: "6380"; log_level: 0; },
  { name: "anyprot"; host: "localhost"; port: "6379"; }
);
