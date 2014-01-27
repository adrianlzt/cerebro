https://github.com/ncode/logix

Logix - Transports your local syslog to Graylog2 via AMQP


When you are sending lots of udp log events over the network packet loss can happen, or even using a tcp log sender you can get a slow response on your server depending on how much logs your remote log server is receiving simultaneously.

So... what can you do to avoid it?

logix can help you using its daemon receiving your log events and queueing you messages on AMQP. You can easily get rid of log event losses caused by udp and any performance issue that could be caused by concurrency using tcp remote syslog.

logix queues your log events on any AMQP Server and you can easy setup your graylog2-server to consume this queue and index your logs on demand.
