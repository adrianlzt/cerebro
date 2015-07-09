https://www.graylog.org/resources/gelf-2/

Formato de los logs

echo '{"version": "1.1","host":"example.org","short_message":"A short message that helps you identify what is going on","full_message":"Backtrace here\n\nmore stuff","level":1,"_user_id":9001,"_some_info":"foo","_some_env_var":"bar"}' | nc -w 1 -u localhost 12200


Otro ejemplo
{
  "version": "1.1",
  "host": "example.org",
  "short_message": "A short message that helps you identify what is going on",
  "full_message": "Backtrace here\n\nmore stuff",
  "timestamp": 1385053862.3072,
  "level": 1,
  "_user_id": 9001,
  "_some_info": "foo",
  "_some_env_var": "bar"
}


Extractores (parseadores de logs) disponibles: https://www.graylog.org/resources/data-sources/

Librerias para distintos lenguajes (para enviar logs directamente al servidor en formato GELF): https://www.graylog.org/resources/data-sources/
