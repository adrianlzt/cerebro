http://dev.mysql.com/doc/refman/5.0/es/packet-too-large.html
http://dev.mysql.com/doc/refman//5.5/en/server-system-variables.html#sysvar_max_allowed_packet

El problema puede estar en el lado cliente o en el lado servidor.
Servidor por defecto 1MB

Cliente:
  libreria -> 1GB
  mysql -> 16MB
  mysqldump -> 24MB

Para cambiarlo en el servidor:
[mysqld]
max_allowed_packet=16M

Para consultar la variable en el servidor:
mysql -e "SHOW GLOBAL VARIABLES like 'max_allowed_packet';"

La variable del cliente en caliente no se puede saber.
Se puede arrancar el cliente con un valor que elijamos: mysql --max_allowed_packet=100MB

Es seguro incrementar el valor de esta variable porque la memoria extra tan solo es utilizada cuando se necesite. Por ejemplo, mysqld solo ocupa más memoria cuando usted ejecuta una consulta grande o cuando mysqld debe retornar una fila de resultados grande

El límite es de 1GB.

Para aumentarla en caliente en el servidor (ejemplo para 32MB)
SET GLOBAL max_allowed_packet=32*1024*1024;

Tener en cuenta:
If you change a global system variable, the value is remembered and used for new connections until the server restarts. (To make a global system variable setting permanent, you should set it in an option file.) The change is visible to any client that accesses that global variable. However, the change affects the corresponding session variable only for clients that connect after the change. The global variable change does not affect the session variable for any client that is currently connected (not even that of the client that issues the SET GLOBAL statement).

Y respecto a la variable de sesión: http://bugs.mysql.com/bug.php?id=52805

Si tenemos un cluster, deberemos cambiar la variable en cada uno de los nodos.

The maximum size of one packet or any generated/intermediate string.
This value by default is small, to catch large (possibly incorrect) packets
