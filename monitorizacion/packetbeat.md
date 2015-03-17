http://packetbeat.com/

Packetbeat is an open source application monitoring and packet tracing system. It works by sniffing the traffic between your application services, correlating them into transactions and using Elasticsearch for analysing them and for ad-hoc queries.

Se arranca un agente en cada máquina que se dedica a sniffar el tráfico de las interfaces y puertos que le digamos.
Envía esta información a un servidor elasticsearch donde podemos generar un dashboard con Kibana.
