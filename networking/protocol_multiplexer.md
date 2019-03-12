https://github.com/yrutschle/sslh
Correr varios servicios (ssh, http, etc) en un mismo puerto.

Con iptables en principio parece que no se puede, porque si queremos usar PREROUTING para decidir donde enviar el tráfico, se tomará la decisión consultando únicamente el primer paquete de la conexión, donde aun no sabemos que tipo de tráfico vamos a usar.


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
