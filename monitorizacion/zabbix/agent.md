https://www.zabbix.com/documentation/3.4/manual/concepts/agent

Zabbix agent is deployed on a monitoring target to actively monitor local resources and applications (hard drives, memory, processor statistics etc).
The agent gathers operational information locally and reports data to Zabbix server for further processing.
Corre como no root


sender.md para utilidad standalone para enviar resultados (esta en los agentes)
get.md para testear agentes (esta en el server)

# Active / Passive
In a passive check the agent responds to a data request. Zabbix server (or proxy) asks for data, for example, CPU load, and Zabbix agent sends back the result.
Active checks require more complex processing. The agent must first retrieve a list of items from Zabbix server for independent processing. Then it will periodically send new values to the server.

Passive Agent <--- Server
Active: Agent ---> Server

En modo activo el agente cache en caso de pérdida de conexión con el server.
Lo pasivos son los únicos que pueden tener scheduling (flexible interval)


# Install
Arch: pacman -Ss zabbix-agent

# Config
https://www.zabbix.com/documentation/3.4/manual/appendix/config/zabbix_agentd

/etc/zabbix/zabbix_agentd.conf

Server=
  parametro para decir que servidores de zabbix nos pueden solicitar métricas


# Items
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/zabbix_agent
Documentación de que es cada item y que parámetros se pueden pasar


# Comandos externos
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/zabbix_agent
system.run[command,<mode>]
Luego podemos usar un preprocesador para obtener valores del check
Hace fork para ejecutar, cuidado con la performance

# UserParameter
https://www.zabbix.com/documentation/3.4/manual/config/items/userparameters
Tambien podemos definir un UserParameter en cada agente.
Este podremos configurarlo desde la interfaz web y ejecutará el script que hayamos configurado en la config del agete.
Hace fork para ejecutar, cuidado con la performance

Ejemplo:
UserParameter=zabbix-nagios-wrapper[*],<Path-to>/zabbix-nagios-wrapper "$1" "$2" "$3" "$4"
UserParameter=ping,echo 1
  para preguntar por este user parameter llamaremos al item "ping"

Por defecto el timeout para estos userparameters es de 3s
La siguiente ejecucción será "item interval" + el timestamp de la última ejecucción.


# Forzar chequeo inmediato
No se puede por ahora (Nov 2017)
https://support.zabbix.com/browse/ZBXNEXT-473
https://support.zabbix.com/browse/ZBXNEXT-810


# Auto-registration
https://www.zabbix.com/documentation/3.4/manual/discovery/auto_registration
It is possible to allow active Zabbix agent auto-registration, after which the server can start monitoring them. This way new hosts can be added for monitoring without configuring them manually on the server.
El agente puede funcionar como activo o pasivo



# Extender el agente / loadable modules
https://www.zabbix.com/documentation/3.4/manual/config/items/loadablemodules
Usar go para crear modulos: https://github.com/cavaliercoder/g2z
Los modulos no pueden acceder a la config del agente. Tendrán que usar un fichero externo.



# Scheduler
El tiempo entre ejecucción de items se calculará con el timestamp de cuando de termino de hacerse la recoleción.
Por ejemplo, si tenemos un UserParameter que tarda 10" y se ejecuta cada minuto, si empieza en 00:00, el siguiente empezará a las 01:10


# Interval
Los flexible intervals solo se pueden usar con agentes pasivos


# Chequear availability de agent
https://www.zabbix.com/documentation/3.0/manual/config/items/itemtypes/internal
Si queremos conocer si el agente esta disponible deberemos usar la key zabbix[host,<type>,available] (internal)
Es mejor usar esto que agent.ping, porque si estamos usando un proxy y este se cae, evitaremos una avalancha de errores.
Usando el zabbix-internal, solo veremos un mensaje protestando porque se ha caido el zabbix pero todos los agente que dependan no se marcarán como rojo (porque solo el proxy puede actualizar ese item).
NO tengo muy claro esto último, es lo que contaron en el curso pero no lo he probado.



# Auto-Registration
Se basa en active check.
El agente pregunta a zabbix server y esto genera un evento.
Podemos poner en este evento un action para crear dinámicamente el host para luego que el host pueda enviar los datos.
Configuration - Actions - Event source: Auto Registration

Para conseguir que ningún host se registre que no queramos, la idea es poner HostMetadata en la conf del agente con una clave, que deberá ser la misma.
Esa misma clave la pondremos como filtro en el action para solo dejar pasar las que tengan la clave buena.
También podemos usarlo para identificar el servidor. Por ejemplo el tipo de equipo para saber que templates ponerle.

Para evitar el acceso externo tambien podemos usar encriptación (TLS).
