Crear un nuevo projecto
$ django-admin startproject prueba
$ python prueba/manage.py runserver

Servidor de development
# python manage.py runserver [ip-addr:port]


# Crear superuser
python manage.py createsuperuser

$ python manage.py shell
$ from <proyecto> import *

Version de django:
import django
django.VERSION

South
# pip install South
http://south.aeracode.org/
intelligent schema and data migrations for Django projects
Permite modificar las “schemas” una vez ya está la aplicación funcionando. BÁSICO!
Consultar la versión de django
