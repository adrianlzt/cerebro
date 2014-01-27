http://vimeo.com/64659016
https://speakerdeck.com/astanway/bring-the-noise-continuously-deploying-under-a-hailstorm-of-metrics

Herramientas que usan:
 nagios: monitoring + alerting
 graphite: database
 supergrep++ (etsy)
 statsd (etsy): recolectar metricas de apps, resolución de 10 segundos
 cacti: network monitoring, resolución de 1 minutos
 skyline (etsy)
 oculus (etsy)


SuperGrep (sería una especie de splunk cutre):
 Primera linea de defensa
 Real time logging
 Se hace streaming de los ficheros de log hacia esta app
 No todos los problemas generan un error, por ello tienen StatsD

StatsD:
 se inserta envios de datos en cualquier parte del código, que se envían a un server central de statsd, y este los flushea a graphite
 Ej.: StatsD::increment("foo.bar")

Los datos se envían a graphite, y luego tienen un montón de dashboards con distintos tipos de valores.
Tienen uno con KPIs (dinero que se está generando/segundo, etc) que miran tras hacer un deploy para ver que todo sigue bien.

Tienen muchas métricas (250.000), no se pueden poner todas en dashboards.
Esto nos lleva a la pregunta importante:
Como analizar anomalías en tiempo real?

Una aproximación sencilla es pedir la información a graphite y analizarla.
El problema es que esto no escala cuando tienes tantas métricas.
Graphite almacena en disco duro, por lo que tenemos un cuello de botella a la hora de contestar.

Por ello desarrollaron skyline: a real time anomaly detection
 usan redis para mantener los datos en memoria y así tener un acceso muy rápido.
 Para obtener los datos usan carbon-relay
 Luego tienen que almacenar las métricas con dos premisas: minimizar IO y memoria
 Para reducir el IO en redis usan append(), y cada métrica que va llegando la unen a la key que ya existe. 
 Esto elimina la necesidad de tener que hacer get lo antiguo + put con lo nuevo. Para poder usar append() todo son strings
 En principio pensaron en usar JSON para tratar la información saliente, pero decodificar JSON consumía la mitad de la CPU

 Tienen un proceso, romba, para ir limpiando los datos antiguos. Corta los datos, y deja solo la mitad más nueva.

 Para el procesado de anomalias: tienen múltiples procesos, asignan un proceso a cada redis key. Cada proceso coge el msgpack, lo analiza, y si encuentra una anomalia lo escribe de nuevo a un redis set. Tras esto se escribe en disco.
 Cada cierto tiempo el frontend coge los datos.


Anomalias: una métrica es anómala si el último punto es mayor/menor que tres desviaciones estandar de la media movible
 problemas:
   distribuciones no normales: esperamos muchos valores en la media y pocos por encima o por debajo
   influencia de picos: aumentan la media movible mucho, y picos menores que vengan próximos no son descubiertos
   periodicidad: un pico todos los días a las 1:00 puede ser una tarea normal

Se me ocurre también problemas tipo disco llenándose muy lentamente (adri)

Otras aproximaciones para la detección de anomalías:
 linear regression
 Holt-Winters
 forecasting
 ensemble
 ARIMA

Una mejora podría ser tener algún tipo de metadata asociada a la métrica para obtener más información.
