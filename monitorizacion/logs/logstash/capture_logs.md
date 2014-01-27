Copy logfiles via the "traditional" methods (e.g. rsync) to the Logstash server and use a "file" input.

I can run Logstash' "syslog" input on individual servers or centrally, and have, say, syslogd forward messages to that.

I can run Logstash on shipping servers, feed logfiles into it, do the filtering thing there, and send results off to ElasticSearch (or Graylog2) from there. (Read Centralized Setup with Event Parsing, which uses Redis as a broker or load balancing Logstash with Redis.)

Lumberjack is a promising new lightweight utility (by Jordan Sissel) which will collect logs locally to ship them elsewhere.

An alternative seems to be Beaver -- a Python daemon that chews on logs and sends their content to a remote Logstash server via Redis or 0MQ. What I particularly like about the Redis way is that it can buffer to disk if the indexer (Logstash) goes down for maintenance.



Lumberjack: https://github.com/jordansissel/lumberjack
Coge logs, o stdin, les asigna unas etiquetas, los comprime y protege (SSL) y los envía a un servidor de logstash.


Beaver: https://github.com/josegonzalez/beaver
Coge logs y los envia a logstash mediante algún broker, redis, ZMQ, Rabbit... O directamente, TCP, UDP...
