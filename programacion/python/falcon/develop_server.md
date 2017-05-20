pip install gunicorn
gunicorn --reload mifichero
  buscara automaticamente un objecto que se llame "application".
  Si tiene otro nombre podemos hacer mifichero:app
  el nombre estandar para el fichero seria wsgi.py

cuando hagamos un cambio en el codigo automaticamente se recargará la app
