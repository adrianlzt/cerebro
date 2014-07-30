http://linux.about.com/library/cmd/blcmdl1_logger.htm

Envia trazas de log a syslog
echo "este es el mensaje" | logger -p auth.info -t prueba

Esto creará en el fichero /var/log/auth.log
Jul 14 11:29:35 adrian-Presario prueba: este es el mensaje
