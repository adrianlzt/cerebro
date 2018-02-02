https://docstore.mik.ua/orelly/networking_2ndEd/ssh/ch03_08.htm
https://web.archive.org/web/20170215184048/https://blogs.oracle.com/janp/entry/how_the_scp_protocol_works
  explicación detallada del protocolo

scp es el que vino con SSH1.
sftp vino con SSH2 y es una mejora, pero el servidor debe implementar el subsistema.v
https://learningnetwork.cisco.com/blogs/network-sheriff/2008/09/22/sshv1-or-sshv2-whats-the-big-deal

Copiar entre dos máquinas remotas:
scp -3 nodoOrigin:file nodoDestino:file
  esto pasa el fichero por el ordenador que lance el ssh
scp nodoOrigin:file nodoDestino:file
  esto copia directamente el fichero desde nodoOrigen a nodoDestino, nodoOrigen tiene que poder acceder via ssh a nodoDestino. Tal vez tengamos que poner el -o con el forward agent


# Funcionamiento de scp

En la máquina donde estemos haciendo ssh escribiremos:

$ scp -t nombre_fichero
CMODE SIZE nombre_fichero
contenido del fichero
en las lineas que haga falta
hasta completar el tamaño dicho
Se deberia terminar enviando
\x00
$

Ejemplo de la primera linea (tras enviar esta cabecera se generará el fichero):
C0600 512 mifichero.log

Cuando vayamos escribiendo el contenido se nos irá devolviendo el porcentaje de fichero subido. Ej:
prueba.scp                                                                                                                                                                        29%  150     0.0KB/s   00:40 ETA

Cuando enviemos todo el tamaño dicho se cerrará la conexión y generará el fichero.


Cuando ejecutamos el comando scp, el servidor debe contestar con \x00
\x01 significará un error, ira seguido del mensaje de error
También puede darse el caso de que nos de un mensaje de error por stderr, que el server no conteste, o conteste otra cosa distinta (todos estos casos de error)

Tras el envío de la primera linea también deberemos recibir \x00, al igual que al final del envio del contenido, tras nosotros enviar \x00 el server debe contestar con \x00



# Código
Para openssh la implementación de scp se realiza aquí (linkado parte del codigo donde se elige que función va a hacer, enviar o recibir:
https://github.com/openssh/openssh-portable/blob/748dd8e5de332b24c40f4b3bbedb902acb048c98/scp.c#L527

Explicación de algunos de los códigos usados en la cabecera:
https://github.com/net-ssh/net-scp/blob/master/lib/net/scp/download.rb#L94
