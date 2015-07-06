You can extend Splunk's capability by installing apps. Splunk apps come with searches, reports, and graphs about specific products that are common to most IT departments. These searches, reports, and graphs reduce the amount of time it takes to glean real value from installing and running the Splunk platform.

It's important to understand how precedence works. In many cases, if there is a configuration file conflict, Splunk gives priority to an app's configuration file. In some situations, installing an app might inadvertently override a setting in a configuration file in the core platform, which might lead to undesired results in data collection. Be sure to read the previously mentioned topic thoroughly for details.


splunkbase.splunk.com
apps.splunk.com



http://apps.splunk.com/app/1306/
Prelert Anomaly Detective



La configuracion está en
/opt/splunk/etc/apps/NOMBRE/local
Los ficheros importantes son:
props.conf
transforms.conf


Ejemplo: estamos filtrando que cada host(s) puedan enviar un tipo de sourcetype
En el ejemplo, las máquinas loadbalancer-dev-01 y loadbalancer-del-01 pueden enviar el sourcetype "misourcetipo"

props:
por cada máquina (filtrando por hostname) le dice que filtros aplicar a los datos.
Generalmente se pone:  null_queue_filter,mifiltro
Que quiere decir que todo lo que no pille mifiltro se descarta. Parece que hace un OR de los filtros que pongamos.

[host::loadbalancer-(dev|del)-01]
TRANSFORMS-tics = null_queue_filter,mifiltro


transforms:
[mifiltro]
SOURCE_KEY = MetaData:Sourcetype
REGEX = misourcetipo
DEST_KEY = queue
FORMAT = indexQueue
