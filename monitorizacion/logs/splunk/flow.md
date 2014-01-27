Cliente
  Universal forwarder
    Inputs:
      /opt/splunkforwarder/etc/system/local/inputs.conf
      /opt/splunkforwarder/etc/apps/*/local/inputs.conf
    Output: 
      /opt/splunkforwarder/etc/system/local/outputs.conf <- definimos a que ip se envían los datos

Podemos analizar con tcpdump port 9997 que salen los datos.
También podemos ver en /opt/splunkforwarder/var/log/splunk/metrics.logs trazas del tipo:
INFO  Metrics - group=tcpout_connections, default-autolb-group:10.6.6.1:9997:0, sourcePort=8089, destIp=10.6.6.4, destPort=9997, _tcp_Bps=14.87, _tcp_KBps=0.01, _tcp_avg_thruput=0.02, _tcp_Kprocessed=953, _tcp_eps=0.03, kb=0.44, max_ackq_size=22020096, current_ackq_size=0


Al otro lado de la conexión puede haber un heavy forwarder o un indexer.

Indexer
  Podemos ver trazas en /srv/splunk/var/log/splunk/metrics.log donde el sourceHost deberá ser el cliente.
  También podremos ver netsat una conexión establecida, y con tcpdump datos llegando al puerto 9997.

  El procesado de la información que llega a la máquina hasta que se indexa se llama 'event processing' 
  http://docs.splunk.com/Splexicon:Eventprocessing
  http://docs.splunk.com/Documentation/Splunk/6.0.1/Data/Overviewofeventprocessing

  Llega un evento -> parsing queue -> parging pipeline -> index queue -> indexing pipeline
