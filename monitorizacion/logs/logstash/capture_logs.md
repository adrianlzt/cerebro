Copy logfiles via the "traditional" methods (e.g. rsync) to the Logstash server and use a "file" input.

I can run Logstash' "syslog" input on individual servers or centrally, and have, say, syslogd forward messages to that.

I can run Logstash on shipping servers, feed logfiles into it, do the filtering thing there, and send results off to ElasticSearch (or Graylog2) from there. (Read Centralized Setup with Event Parsing, which uses Redis as a broker or load balancing Logstash with Redis.)

Lumberjack is a promising new lightweight utility (by Jordan Sissel) which will collect logs locally to ship them elsewhere.

An alternative seems to be Beaver -- a Python daemon that chews on logs and sends their content to a remote Logstash server via Redis or 0MQ. What I particularly like about the Redis way is that it can buffer to disk if the indexer (Logstash) goes down for maintenance.



Lumberjack: https://github.com/jordansissel/lumberjack
Coge logs, o stdin, les asigna unas etiquetas, los comprime y protege (SSL) y los envía a un servidor de logstash.
Muy ligero, escrito en go
Ahora se llama logstash-forwarder: https://github.com/elastic/logstash-forwarder

Descarga: tgz, rpm, deb, etc: https://www.elastic.co/downloads/logstash

Para tener HA, configurar el servidor a un dns round robin. El cliente intentará conectar haciendo distintas peticiones dns hasta que encuentre un server que conteste correctamente:
https://discuss.elastic.co/t/logstash-forwarder-reconnect-with-round-robin-dns/2101
https://github.com/elastic/logstash-forwarder/blob/master/publisher1.go#L168

Performance, en mi portatil, enviando a un server externo:
42" 168000 lineas


# Otras opciones
Beaver: https://github.com/josegonzalez/beaver
Coge logs y los envia a logstash mediante algún broker, redis, ZMQ, Rabbit... O directamente, TCP, UDP...


# Instalar
git clone git://github.com/elasticsearch/logstash-forwarder.git
cd logstash-forwarder
go build -o logstash-forwarder

# Configurar
lumberjack.json hay una copia de lumberjack.json en este mismo dir

Hace falta configurar el "ssl ca" con el certificado del servidor donde atacamos o la autoridad certificadora que haya firmado.
Si atacamos ips y no están metidas como SAN en el certificado nos dirá:
Failed to tls handshake with 172.16.1.28 x509: cannot validate certificate for 172.16.1.28 because it doesn't contain any IP SANs

# Arrancar
logstash-forwarder -config lumberjack.json

Por defecto lee ficheros de /var/log/messages /var/log/*.log /var/log/http/... y stdin

Al meter algo en stdin nos dirá:
2015/06/09 10:50:10.806524 Registrar: processing 1 events


# Parar
Al pararlo escribirá en .logstash-forwarder el offset de los ficheros que ha leído.
