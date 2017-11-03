Los templates son conjuntos de aplicaciones, items, graphs, etc.
Podemos obtener nuevos en share.zabbix.com



# Override
http://voice1.me/zabbix-allowing-per-host-overrides/

Si necesitamos modificar el valor de un trigger para un host determinado usaremos las macros.
Por ejemplo, usamos el template de linux para todos los servidores, que tiene configurado un trigger si el número de procesos es mayor a 300.
Para un host determinado necesitamos que ese valor sea 1000.

Creamos una macro a nivel de template, por ejemplo la llamamos {$MAX_PROC} y le ponemos el valor que estaba definido a fuego.
Ahora modificamos el trigger. Donde ponia 300 ponemos la macro.

Ahora vamos a las macros del host, creamos la misma y definimos el valor 1000.
