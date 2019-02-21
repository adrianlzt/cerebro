https://www.zabbix.com/documentation/3.4/manual/quickstart/template
https://www.zabbix.com/documentation/3.4/manual/config/templates

Los templates son conjuntos de aplicaciones, items, triggers, graphs, etc.
Podemos obtener nuevos en share.zabbix.com

Las templates se asocian en grupos, que suelen ser como directorios:
Eg.: Templates/Applications


Y un host tiene las templates A y B, e intentamos poner un template heredado a esas dos (C por ejemplo), fallará, porque estaremos intentando poner los mismos items por dos caminos.
El error: "Template cannot be linked to another template more than once even through other templates"



# Override
http://voice1.me/zabbix-allowing-per-host-overrides/

Si necesitamos modificar el valor de un trigger para un host determinado usaremos las macros.
Por ejemplo, usamos el template de linux para todos los servidores, que tiene configurado un trigger si el número de procesos es mayor a 300.
Para un host determinado necesitamos que ese valor sea 1000.

Creamos una macro a nivel de template, por ejemplo la llamamos {$MAX_PROC} y le ponemos el valor que estaba definido a fuego.
Ahora modificamos el trigger. Donde ponia 300 ponemos la macro.

Ahora vamos a las macros del host, creamos la misma y definimos el valor 1000.


# Exportar
En "Configuration" seleccionamos lo que queremos (checkbox) y bajamos al final de a web, "Export"
