http://www.graylog2.org/

Graylog2 enables you to unleash the power that lays inside your logs. Use it to run analytics, alerting, monitoring and powerful searches over your whole log base. Need to debug a failing request? Just run a quick filter search to find it and see what errors it produced. Want to see all messages a certain API consumer is consuming in real time? Create streams for every consumer and have them always only one click away.

The Graylog2 server is written in Java and accepts log messages via a UDP or TCP syslog listener onport 514 (configurable) or AMQP. It also requires an installed MongoDB in which it stores user accounts, some of its configuration, and statistics.
In addition to syslog, Graylog2 accepts messages via GELF, either directly on the Graylog2 server or from remote locations, using one of the supported language bindings. Whatever Graylog2 receives, it stores in ElasticSearch.
