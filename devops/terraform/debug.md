https://www.terraform.io/docs/internals/debugging.html

Niveles de log: TRACE, DEBUG, INFO, WARN or ERROR

TF_LOG=DEBUG terraform apply

Si queremos guardar el log en un fichero:
TF_LOG_PATH=/path/file ...


# Output
usar output {} para sacar variables y poder tracear como se van formando.
Recordar que si el value es vacio no mostrará nada
