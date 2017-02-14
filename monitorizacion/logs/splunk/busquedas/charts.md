TOTEM processor joined | chart count by date_hour
Busca las entradas que tengan "TOTEM processor joined", y las cuenta por cada hora
El 'by LOQUESEA', ese loquesea tiene que estar en los 'Fields' que aparecen al buscar a la izquierda.

Busca errores de "gap state sequence" o de "TOTEM processor joined", y me genera una gráfica con dos barras, una para los errores de gap y otro para los de totem.
(sourcetype=err Gap state sequence) OR (TOTEM processor joined) | chart count(eval(sourcetype="err")) AS PERCONA count(eval(sourcetype="corosync")) AS COROSYNC by date_hour


Timechart que con detalle de un dia te cuenta cuantos call traces se han producido
call trace kernel | timechart span=1day count as "Call Traces"


Muestra las horas a las que se producen los eventos, y separa por colores los distintos días de la semana
source="/var/log/messages" | chart count by date_hour, date_wday


Pydstat está escribiendo el consumo de los distintos pid al syslog.
Con esta gráfica muestro el consumo de CPU en cada minuto
source="pydstat.log" Command="httpd" | timechart span=1m avg(pct_CPU)
Como las trazas son cada 5m, el span da igual que sea 1m,2m,3m o 4m (5m podría cogerme la media entre dos)
Si tuviese más trazas (por ejemplo cada minuto) e hiciésemos span=2m avg(pct_CPU) me sacaría la media de consumo de la CPU en esas 2 trazas que entrarían en el span.

Si quiero sacar más datos:
source="pydstat.log" Command="httpd" | timechart span=1m avg(pct_CPU),avg(VSZ)
El problema es que la gráfica pone una escala común para ambos datos, y como VSZ es mucho mayor, no veremos casi nada (poniendo la escala logarítima algo veremos)


Mostrar la carga por cada commando:
source="pydstat.log" | timechart span=4m avg(pct_CPU) by Command
Chart type: Area
Missin values: Connect
Stack mode: podemos usar cualquiera, el None se entiende bastante bien



Calcular la resta de dos valores, tirando de dos sourcetypes distintos.
Nos da una gráfica basada en tiempo con la diferencia de número de resultados de las trazas encontradas en dos ficheros:
index=index host="icinga01" "Icinga restarted successfully" OR "Icinga 1.11.6 starting..." | timechart span=1d count(eval(source="/nagios/log/cyclops.log")) as cyclops count(eval(source="/nagios/log/icinga.log")) as icinga | eval diff=abs(icinga-cyclops) | table _time diff
