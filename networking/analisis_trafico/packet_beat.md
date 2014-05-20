Packetbeat looks like a very nice new open source application monitoring and packet tracing system. A lovely Kibana based interface and agents which can detect various types of traffic once installed make for a very simple getting started experience.

http://packetbeat.com/

Se instalan unos agentes en cada servidor. También es necesario tener instalado logstash + kibana en el servidor que recoletará y mostrará las trazas.
Los agentes enviarán los datos directamente a logstash mediante el puerto 9200.

En la configuración definiremos los puertos a tracear y que servicio corre en cada puerto. También podemos configurar los procesos que corren en cada puerto para tener más información.
