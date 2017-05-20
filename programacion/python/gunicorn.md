Servidor WSGI
Podemos usarlo, por ejemplo, con falcon

pip install gunicorn

gunicorn --reload fichero:app
  recarga automatica si detecta algun cambio


gunicorn app:application --bind 0.0.0.0:8000


