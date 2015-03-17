# Region controler (el principal)
postgresql
python-django-maas
  apache: /etc/maas/maas-http.conf
  redirige las peticiones a /MAAS/longpoll/ al puerto 5254 (txlongpoll)
squid-deb-proxy
  proxy para cachear los paquetes debian/ubuntu a los clientes
rabbitmq-server
  puerto 5672
/etc/init/maas-region-celery.conf
  Escribe tareas en rabbit
  /etc/maas/maas_local_celeryconfig.py
  Depende de rabbit.
  /usr/bin/python /usr/bin/celeryd --logfile=/var/log/maas/celery-region.log --schedule=/var/lib/maas/celerybeat-region-schedule --loglevel=INFO --beat --queues=celery,master
/etc/init/maas-txlongpoll.conf
  Long polling HTTP frontend for AMQP
  Abre puerto 5254
  Escucha en el puerto 80 en /MAAS/longpoll/ y escribe en rabbit
  Depende de /etc/init.d/rabbitmq-server
  /usr/bin/twistd -n --uid=maas --gid=maas --pidfile=/run/maas-txlongpoll.pid --logfile=/dev/null txlongpoll --config-file=/etc/maas/txlongpoll.yaml


# Cluster controller (puede haber varios)
apache: /etc/maas/maas-cluster-http.conf
  para servir imagenes de SO via http
bind9utils
  /etc/init.d/bind9
  conf en /etc/bind/maas
maas-dhcp
tgt (iSCSI)
/etc/init/maas-clusterd.conf
  /usr/bin/python /usr/bin/twistd -n --uid=maas --gid=maas --pidfile=/run/maas-pserv.pid --logfile=/dev/null maas-pserv --config-file=/etc/maas/pserv.yaml
  servidor TFTP
/etc/init/isc-dhcp-server.override
/etc/init/maas-cluster-celery.conf
  /etc/maas/maas_cluster.conf
  /usr/bin/python -m provisioningserver start-cluster-controller http://10.0.2.15/MAAS -u maas -g maas

Aqui corre el provisioning server:
/usr/lib/python2.7/dist-packages/provisioningserver
