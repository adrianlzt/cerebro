Servidor WSGI
Podemos usarlo, por ejemplo, con falcon

pip install gunicorn

gunicorn --reload fichero:app
  por defecto busca una variable que se llame application (con :app estamos forzando el nombre)
  recarga automatica si detecta algun cambio


gunicorn app:application --bind 0.0.0.0:8000

Timeout:
--timeout 60


Si queremos un script python que arranque gunicorn:
http://docs.gunicorn.org/en/latest/custom.html


# TLS
--keyfile FILE
--certfile FILE
--ca-certs FILE

# Hooks
http://docs.gunicorn.org/en/latest/settings.html#server-hooks
Para ejecutar cosas al arrancar, parar, etc
