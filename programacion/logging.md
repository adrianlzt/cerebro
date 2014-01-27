Crear aplicaciones que logeen a un servidor GELF en vez de a syslog.
https://github.com/Graylog2/graylog2-docs/wiki/GELF
The Graylog Extended Log Format (GELF) avoids the shortcomings of classic plain syslog:
  Limited to length of 1024 byte – not much space for payloads like backtraces.
  Unstructured. You can only build a long message string and define priority, severity etc.


