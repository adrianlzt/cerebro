https://www.terraform.io/docs/internals/debugging.html

Niveles de log: TRACE, DEBUG, INFO, WARN or ERROR

TF_LOG=DEBUG terraform apply

Si queremos guardar el log en un fichero:
TF_LOG_PATH=/path/file ...
