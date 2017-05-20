Servidor WSGI
Podemos usarlo, por ejemplo, con falcon

pip install gunicorn

gunicorn --reload fichero:app
  por defecto busca una variable que se llame application (con :app estamos forzando el nombre)
  recarga automatica si detecta algun cambio


gunicorn app:application --bind 0.0.0.0:8000


