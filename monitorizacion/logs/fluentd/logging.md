<system>
  log_level warn
</system>


Tambien se puede especificar por plugin:
https://docs.fluentd.org/v0.12/articles/logging#per-plugin-log
<source>
  @type tail
  @log_level debug



# Trazas internas
Fluent tambien genera trazas de sus propios mensajes que las mete en los tag:
fluent.*
siendo "*" los distintos niveles de log: debug, info, warn, etc
