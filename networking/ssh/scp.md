https://docstore.mik.ua/orelly/networking_2ndEd/ssh/ch03_08.htm

scp es el que vino con SSH1.
sftp vino con SSH2 y es una mejora, pero el servidor debe implementar el subsistema.v


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

Ejemplo de la primera linea:
C0600 512 mifichero.log

Cuando vayamos escribiendo el contenido se nos irá devolviendo el porcentaje de fichero subido. Ej:
prueba.scp                                                                                                                                                                        29%  150     0.0KB/s   00:40 ETA

Cuando enviemos todo el tamaño dicho se cerrará la conexión y generará el fichero.


Cuando ejecutamos el comando scp, el servidor debe contestar con \x00
\x01 significará un error, ira seguido del mensaje de error
También puede darse el caso de que nos de un mensaje de error por stderr, que el server no conteste, o conteste otra cosa distinta (todos estos casos de error)

Tras el envío de la primera linea también deberemos recibir \x00, al igual que al final del envio del contenido, tras nosotros enviar \x00 el server debe contestar con \x00
