Tener una baseline de como funciona normalmente para poder comparar.
Tiempo de procesamiento de los procesos, logs de debug, etc
Cuanto pico de NPVS podemos sostener.
Tiempo de procesado de LLDs
Ejemplos de "ps"

NVPS se miden en la entrada (pollers, trappers, función hc_clone_history_data)
Otra medida interesante es la cantidad de items que procesan los history syncer, que la podremos sacar con queries a la db.

# Logs

Si queremos buscar algo en los logs típicamente haremos:
tail -f zabbix_server.log | grep -v -e "became supported" -e "became not supported" -e "is not suitable for value" -e "sending configuration data to proxy" -e "Cannot evaluate expression"

De esta manera nos quitamos las típicas trazas recurrentes que posiblemtente no estamos buscando.

Contar número de lineas por hora:
cat zabbix_server.log | grep -e "^\s*[0-9]*:" | awk '{print $1;}' | cut -d ':' -f 2,3 | cut -c 1-11 | uniq -c

Analizar logs debug con zabbix-debug-logs (ssh://git@gitlab.opensolutions.cloud:20022/adrian/zabbix-debug-logs.git)
Usar versión zabbix modificada para sacar cada log a un fichero

## Trocear un fichero de log en un fichero por pid

Ejemplo para separar solo los trappers, siendo el fichero de log comprimido con gzip

for pid in $(ps -e f | grep "trapper [#]" | cut -d ' ' -f 2); do
  zgrep "^\s*${pid}:20" zabbix_server.log.trappers.gz > ${pid}.log
done

Con python, sin necesidad de tener los pids. No muy eficiente al tener que abrir ficheros todo el rato.
Nos pide un fichero como primer param y separa en PID.trapper.log
4.6G procesado en ~4min

```python
import sys
log = sys.argv[1]
with open(log, 'r') as f:
  for line in f:
    pid = line.split[':'](0).strip()
    try:
      int(pid)
    except ValueError:
      continue

    with open('%s.trapper.log' % pid, 'a') as p:
      p.write(line)
```

Mirar troubleshooting_tiempo_entre_lineas.py para buscar saltos de tiempo.

# Queues

queue.md

Agente zabbix configurado como pasivo (sin valor en ServerActive) en su config pero como activo en la config del server?
El Hostname configurado en la config del agente zabbix no es el mismo que en la config del server? Mayusculas/minúsculas?

# Caches

Mirar graph "Zabbix cache usage".
La cache "history write" es la que almacena los datos procesados antes de indexarlos en la bbdd.
No podemos mirarla si no tenemos la métrica (la obtiene internamente el poller)

Lag de los datos de la bbdd respecto al tiempo real (Solo cojemos los items activos calculated, que los tenemos a 1m, comprobar con explain que no es muy cara la query):
select ROUND(EXTRACT(EPOCH FROM now()))-clock AS lag from history where itemid IN ( select itemid from items,hosts where items.hostid=hosts.hostid and items.value_type=0 and items.type=15 and items.state=0 and items.status = 0 and items.flags=0 and hosts.name='NOMBRESERVERZABBIX') order by clock desc limit 1;

Obtener estado cache:
while true; do zabbix_server -R diaginfo=historycache | grep -A 1 "Memory.data" | grep used; sleep 10; done
El used suele estar por debajo de 1M.

En caso de que se llene mucho, zabbix no permite empujar los datos desde los zabbix-proxies.

Versiones antiguas:
Obtener el estado de la cache con gdb + python

<https://support.zabbix.com/browse/ZBX-17342>
En la 4.0.19 se escupe por el log el estado de la cache cuando se llena

# History syncer

Items/sec procesados por los history syncers:
Zabbix 3.2:
while true; do date; ps -ef | grep history | egrep -o "synced [0-9]_._ sec" | cut -d ' ' -f 2,5 | tr ' ' '/' | xargs echo | tr ' ' '+' | bc; sleep 3; done

Zabbix 4.0:
while true; do date; ps -ef | grep history | egrep -o "synced [0-9]_._ sec" | cut -d ' ' -f 2,7 | tr ' ' '/' | xargs echo | tr ' ' '+' | bc; sleep 3; done

Tal vez otros procesos de zabbix bloqueando la cache y ralentizando a los history?

# Proxies

Tenemos?
Mirar "Problema overflow" en proxy.md

# Zabbix web: Audit, login incorrectos

Reports > Audit
Para ver quien se ha logeado, si se han metido cambios, etc

# Slow queries

Mostrar cuantas están saliendo por minuto
cat zabbix_server.log | grep "slow query" | grep -e "^\s*[0-9]*:" | awk '{print $1;}' | cut -d ':' -f 2,3 | cut -c 1-13 | uniq -c

# Procesos internos

ps -eo args | grep zabbix_serve[r] | less

watch -n 1 'ps -eo args | grep zabbix | grep -v -e idle -e "waiting for"'

# Zabbix-web queries pesadas

La idea es ver el ip_source:port_source y mapearlo a un proceso de php-fpm.

## Usando procmem

sudo procmem -p 191674 search -B 400 -A 2500 REMOTE_PORT -W 180 | cut -d "|" -f 2-

Esto nos dará la info donde está la petición, quien la hizo, etc.

Podemos buscar por otra cadena si queremos intentar ver la query SQL.
Aunque esa query la podemos ver en postgres, que será la que esté running.

## Usando dump_mem

Mejor con gcore (de gdb). Mirar en debug.md

Si tenemos un php-fpm ejecutando una TX que dura mucho tiempo, podemos hacer un volcado de memoria del proceso php-fpm y ver que está ejecutando
dump_mem.py 4273 |& strings >& dump.4273.txt
parece que "gcore", de gdb, nos permite hacer un dump: gcore -o out pid

cat dump.4273.txt | grep -e REMOTE_ADDR -e HTTP_USER_AGENT -e REQUEST_METHOD -e QUERY_STRING -e HTTP_REFERER -e SCRIPT_NAME -e REQUEST_URI -e '"jsonrpc"'
asi deberiamos poder ver quien nos está pidiendo que, a donde, que POST nos ha hecho, etc
mirando el "auth" de la petición json podemos ver quien es (tabla session y users)

Si vemos peticiones tipo:
SELECT i.itemid,i.name,i.type,i.value*type,i.units,i.hostid,i.state,i.valuemapid,i.status,i.error,i.trends,i.history,i.delay,i.key*,i.flags FROM items i WHERE i.flags IN (0,4) AND (i.hostid BETWEEN '10118' AND '10133' OR i.hostid BETWEEN '18682' AND '18686' OR i.hostid BETWEEN '18688' AND '18697' OR i.hostid BETWEEN '29766' AND '29771' OR i.hostid BETWEEN '30926' AND '30930' OR i.hostid BETWEEN '31448' AND '31454' OR i.hostid BETWEEN '31785' AND '31790' OR i.hostid BETWEEN '34368' AND '34373' OR i.hostid BETWEEN '34493' AND '34499' OR i.hostid BETWEEN '34515' AND '34521' OR i.hostid BETWEEN '34524' AND '34528' OR i.hostid BETWEEN '37431' AND '37439' OR i.hostid BETWEEN '39810' AND '39820' OR i.hostid BETWEEN '39822' AND '39830' OR i.hostid BETWEEN '39842' AND '39848' OR i.hostid BETWEEN '40901' AND '40913' OR i.hostid BETWEEN '40985' AND '40996' OR i.hostid BETWEEN '41002' AND '41012' OR i.hostid BETWEEN '41024' AND '41029' OR i.hostid BETWEEN '41034' AND '41038' OR i.hostid BETWEEN '41040' AND '41046' OR i.

Es probable que fuese una consulta a latest data que se fue de madre.
Habrá que matar a los php-fpm involucrados.

En zabbix 4.0 podíamos conocer el usuario a partir del session id.
En zabbix 6.0 es un json codificado como base64
Ejemplo:
zbx_sessionid=eyJzZXNzaW9uaWQiOiIzODU3NzE0MjQzZGVlMWEwMGY5ZmNlYzQxMzg5MDEyNiIsInNlcnZlckNoZWNrUmVzdWx0Ijp0cnVlLCJzZXJ2ZXJDaGVja1RpbWUiOjE3MTEzODYyOTksInNpZ24iOiI0MTM2MTNhZTE0NjY4ZjhhZWU4NzQzNWJhMzE3NzIyMWY3NDVmYjllYTE2MzAyOWM2MTQyMTA2NTI0M2FlMmEwIn0%3D

Decodificado:
{"sessionid":"3857714243dea0f9cec41389126","serverCheckResult":true,"serverCheckTime":1711386299,"sign":"a163029c61421065243ae2a0"}

Ver que filtros tienen configurados los usuarios.
Nos puede valer para ver quien pudo lanzar la petición:
select \* from profiles where userid=411 and idx like '%latest%' ;

# Problemas con PSK identities

El servidor de zabbix se comporta raro, encolando datos a ratos.
Podría ser por tener una psk identity duplicada con valores distintos.

La doc ya nos avisa de este problema:
Each PSK identity must be paired with only one value. It is the user's responsibility to ensure that there are no two PSKs with the same identity string but different values. Failing to do so may lead to unpredictable errors or disruptions of communication between Zabbix components using PSKs with this PSK identity string.

Zabbix tiene un arbol de decisión de que hacer según van llegando datos con PSK y no gestiona bien ese caso de dos identities con distinto valor: <https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/src/libs/zbxdbcache/dbconfig.c?at=refs%2Ftags%2F6.0.31#1242>

Los mapeos de identity->value los hace en un hashset (diccionario).
