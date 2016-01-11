https://console.developers.google.com/project


Correr en local:
  dev_appserver.py .

Desplegar en google:
  appcfg.py update app.yml

App desplegada en:
   https://project-id.appspot.com/


#############
Django parece que no es una opción sobre GAE.
El repo de ejemplo es muy antiguo (> 2 años)
https://github.com/django-nonrel/django-testapp

http://djangoappengine.readthedocs.org/en/latest/index.html

No permite relaciones many-to-many

#############




# Django, no lo he conseguido hacer funcionar bien
Ejemplo de app django para gae: https://cloud.google.com/appengine/articles/django-nonrel#st
pip install gae_installer

https://cloud.google.com/appengine/articles/django-nonrel#dr
https://github.com/django-nonrel/djangoappengine

Bajar los zips que pone aqui:
http://djangoappengine.readthedocs.org/en/latest/
https://cloud.google.com/appengine/downloads

pip install PIL --allow-external PIL --allow-unverified PIL


https://github.com/adrianlzt/django-sample-app

Hay que usar djangoappengine

Crear proyecto en:
https://console.developers.google.com/project

En la terminal donde desarrollamos:
mkdir miproyecto
cd miproyecto
wget https://github.com/GoogleCloudPlatform/appengine-django-skeleton/archive/master.zip
unzip master.zip
appcfg.py -A miproyecto update app.yaml
http://miproyecto.appspot.com/

En lib/ esta django metido.
En appengine_config.py se añadie la lib:
from google.appengine.ext import vendor
vendor.add('lib')

En lib/ tendremos que meter todos las libs de requisitos de nuestro sistema

## Base de datos
https://cloud.google.com/appengine/docs/python/cloud-sql/django#running-the-development-server

Parece que tenemos que usar en local mysql:
http://stackoverflow.com/questions/26938809/problems-with-psycopg2-on-google-apps-engine
http://stackoverflow.com/questions/21302612/using-sqlite-for-local-django-development-for-google-app-engine

Use the standard django.db.backends.mysql when running in production and accessing a production Google Cloud SQL instance.
Use the standard django.db.backends.mysql when running on a developer workstation and accessing a local MySQL instance. In this case, the application uses the system MySQLdb driver.
Use the custom backend google.appengine.ext.django.backends.rdbms when running on a developer workstation and accessing a production Cloud SQL instance.


Necesitaremos tener la lib de python en nuestro virtualenv
pip install MySQL-python

if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine'):
    # Running on production App Engine, so use a Google Cloud SQL database.
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'HOST': '/cloudsql/cloud-monitoring-external:library',
            'NAME': 'polls',
            'USER': 'root',
        }
    }
else:
    DATABASES = {
        'default': {
            # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'dev_database_name',
            'USER': 'dev_user',
            'PASSWORD': 'dev_p@ssword',
            'HOST': 'localhost',
            'PORT': '',
        }
    } 




# App.yml ejemplo
## Django
application: nombre
version: 1
runtime: python27
api_version: 1
threadsafe: yes

handlers:
- url: /static
  static_dir: static/
- url: .*
  script: mysite.wsgi.application

libraries:
- name: MySQLdb
  version: "latest"
???FIN

django-nonrel
djangoappengine
djangotoolbox
django-autoload
django-dbindexer

pip install python-appengine
pip install pyyaml
pip install PIL --allow-external PIL --allow-unverified PIL


https://github.com/adrianlzt/django-sample-app

Hay que usar djangoappengine

Crear proyecto en:
https://console.developers.google.com/project

En la terminal donde desarrollamos:
mkdir miproyecto
cd miproyecto
wget https://github.com/GoogleCloudPlatform/appengine-django-skeleton/archive/master.zip
unzip master.zip
appcfg.py -A miproyecto update app.yaml
http://miproyecto.appspot.com/

En lib/ esta django metido.
En appengine_config.py se añadie la lib:
from google.appengine.ext import vendor
vendor.add('lib')

En lib/ tendremos que meter todos las libs de requisitos de nuestro sistema

## Base de datos
https://cloud.google.com/appengine/docs/python/cloud-sql/django#running-the-development-server

Parece que tenemos que usar en local mysql:
http://stackoverflow.com/questions/26938809/problems-with-psycopg2-on-google-apps-engine
http://stackoverflow.com/questions/21302612/using-sqlite-for-local-django-development-for-google-app-engine

Use the standard django.db.backends.mysql when running in production and accessing a production Google Cloud SQL instance.
Use the standard django.db.backends.mysql when running on a developer workstation and accessing a local MySQL instance. In this case, the application uses the system MySQLdb driver.
Use the custom backend google.appengine.ext.django.backends.rdbms when running on a developer workstation and accessing a production Cloud SQL instance.


Necesitaremos tener la lib de python en nuestro virtualenv
pip install MySQL-python

if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine'):
    # Running on production App Engine, so use a Google Cloud SQL database.
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'HOST': '/cloudsql/cloud-monitoring-external:library',
            'NAME': 'polls',
            'USER': 'root',
        }
    }
else:
    DATABASES = {
        'default': {
            # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'dev_database_name',
            'USER': 'dev_user',
            'PASSWORD': 'dev_p@ssword',
            'HOST': 'localhost',
            'PORT': '',
        }
    } 




# App.yml ejemplo
## Django
application: nombre
version: 1
runtime: python27
api_version: 1
threadsafe: yes

handlers:
- url: /static
  static_dir: static/
- url: .*
  script: mysite.wsgi.application

libraries:
- name: MySQLdb
  version: "latest"




mkvirtualenv test
pip install PIL --allow-external PIL --allow-unverified PIL
Bajar (o hacer git clone y symlinks):
  https://github.com/django-nonrel/django/zipball/nonrel-1.5
  https://github.com/django-nonrel/djangoappengine/zipball/master
  https://github.com/django-nonrel/djangotoolbox/zipball/master
  http://bitbucket.org/twanschik/django-autoload/get/tip.zip
  https://github.com/django-nonrel/django-dbindexer/zipball/master
for i in $(ls *.zip); do unzip $i; done
Mover de los directorios de los zips los dirs de codigo al raiz:

Nos deberia quedar:
<project>/autoload
<project>/dbindexer
<project>/django
<project>/djangoappengine
<project>/djangotoolbox


Creamos un proyecto:
PYTHONPATH=. python django/bin/django-admin.py startproject --name=app.yaml --template=djangoappengine/conf/project_template gaedjango2 .

Lo arrancamos:
PYTHONPATH=. python manage.py runserver

http://localhost:8080


!!! No soporta many-to-many !!!
Many advanced Django features are not supported at the moment. A few of them are:
many-to-many relations
...

Crear app:
PYTHONPATH=. python manage.py startapp prueba1


# Con el repo
git clone https://github.com/django-nonrel/django-testapp.git
cd django-testapp

