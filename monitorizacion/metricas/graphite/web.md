local_settings.py

SECRET_KEY = 'xxxxxxxx'
TIME_ZONE = 'Europe/Madrid'

Memcached, no recomendado por https://grey-boundary.io/the-architecture-of-clustering-graphite/

Dirs donde se almacenan las métricas

Configuración de email para enviar metricas

LDAP

Database conf. Por defecto sqlite
  Descomentar la conf de sqlite.
  Para redhat/centos:
    'NAME': '/var/lib/graphite-web/graphite.db'
Iniciar base de datos:
python /usr/lib/python2.6/site-packages/graphite/manage.py  syncdb
chown apache:apache /var/lib/graphite-web/graphite.db

Cluster conf
