Funcionamiento de scp.

En la máquina donde estemos haciendo ssh escribiremos:

$ scp -t nombre_fichero
CMODE SIZE nombre_fichero
contenido del fichero
en las lineas que haga falta
hasta completar el tamaño dicho
$

Ejemplo de la primera linea:
C0600 512 mifichero.log

Cuando vayamos escribiendo el contenido se nos irá devolviendo el porcentaje de fichero subido. Ej:
prueba.scp                                                                                                                                                                        29%  150     0.0KB/s   00:40 ETA

Cuando enviemos todo el tamaño dicho se cerrará la conexión y generará el fichero.
