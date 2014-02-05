Tres tipos: universal, light y heavy.


## Light ##
collectd data on a forwarder that requires a python-based scripted input


## Heavy: instancia entera de splunk configurada como forwarder ##
Route collected data based on event info or filter data prior to WAN/slower connection

Un heavy en cada datacenter.
Solo una política de firewall desde el heavy al indexer.


## Universal: splunkforwarder ##
Forward unparsed data to a receiber or indexer

Instalacion: 
yum install splunkforwarder
/opt/splunkforwarder/bin/splunk enable boot-start
chkconfig splunk on


/opt/splunkforwarder/etc/system/local/inputs.conf
Aqui decimos que ficheros de log se van a monitorizar.
Y damos un 'source-type', que es el tipo de log (apache, mysql, etc)
También definimos el index, es como dividiremos los datos (por ejemplo, para diferenciar entre proyectos)

Ejemplo:
    [default]
    host = server.com
    
    [monitor:///var/log/pay.log]
    crcSalt = <source>
    sourcetype = analytics_payment
    index = index1 



/opt/splunkforwarder/etc/system/local/outputs.conf
Decimos a quien se lo enviamos (a un heavy forwarder, o a un indexador)


Ejemplo:

    [tcpout]
    defaultGroup = default-autolb-group
    maxQueueSize = 7MB
    useACK = true
    [tcpout:default-autolb-group]
    server = 10.2.6.11:9997
    useACK = true


Con un universal no podemos decidir que filtrar. A cambio, consume menos recursos.

Le podemos definir en el output distintas máquinas que recibiran datos (en plan load balancer)
Se puede definir si queremos ACK (mayor consistencia) o no (mayor velocidad sin ACK)
Se puede definir parámetros de tamaños de colas.
