Configure machines to forward syslog entries to the remote Graylog2 syslog-listener, or have rsyslogd store in ElasticSearch itself.
Ship log entries via GELF to the Graylog2 server.
Use Gelfino, a tiny GELF server (written in Closure), as forwarder endpoint to Graylog2.
logix is a Python daemon which queues events over AMQP for transmission to Graylog2's AMQP listener.
