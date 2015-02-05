Es el servidor que contesta a TFTP y genera los ficheros PXE (preguntando a la API).
/etc/init/maas-clusterd.conf


/usr/bin/python /usr/bin/twistd -n --uid=maas --gid=maas --pidfile=/run/maas-pserv.pid --logfile=/tmp/pserv.log maas-pserv --config-file=/etc/maas/pserv.yaml

Twisted llama a /usr/lib/python2.7/dist-packages/twisted/plugins/maasps.py
Ese python hace uso de la libreria python-maas-provisioningserver

Para generar el fichero de configuración para PXE hará consultas a la API:

GET /MAAS/api/1.0/pxeconfig/?cluster_uuid=2bd3cdb4-9bb9-4559-948a-a1f3f5c46b96&local=192.168.123.2&mac=52-54-00-d5-64-9b&remote=192.168.123.202
  En caso de que el host no sea conocido esta petición no devolverá nada

GET /MAAS/api/1.0/pxeconfig/?cluster_uuid=2bd3cdb4-9bb9-4559-948a-a1f3f5c46b96&local=192.168.123.2&remote=192.168.123.202
  Esta petición si devolverá valor, aunque no se conozca el nodo:
{"arch": "amd64", "subarch": "generic", "release": "trusty", "label": "release", "purpose": "commissioning", "hostname": "maas-enlist", "domain": "local", "preseed_url": "http://192.168.1.47/MAAS/metadata/latest/enlist-preseed/?op=get_enlist_preseed", "log_host": "192.168.1.47", "fs_host": "192.168.123.2", "extra_opts": null}

Esto generará estas opciones para el fichero default de PXE:

nomodeset iscsi_target_name=iqn.2004-05.com.ubuntu:maas:ephemeral-amd64-generic-trusty-release iscsi_target_ip=192.168.123.2 iscsi_target_port=3260 iscsi_initiator=maas-enlist ip=::::maas-enlist:BOOTIF ro root=/dev/disk/by-path/ip-192.168.123.2:3260-iscsi-iqn.2004-05.com.ubuntu:maas:ephemeral-amd64-generic-trusty-release-lun-1 overlayroot=tmpfs cloud-config-url=http://192.168.1.47/MAAS/metadata/latest/enlist-preseed/?op=get_enlist_preseed log_host=192.168.1.47 log_port=514


La IP que se pone para temas iSCSI es la que tenga el servidor tftp, que se pone en la query como parámetro ('local').
Para ver como se forma la respuesta leer api_server.md


# Debug
Modificar /etc/init/maas-clusterd.conf para poner un fichero en '--logfile'

    exec /usr/bin/authbind --deep /usr/bin/twistd \
        --nodaemon --uid=maas --gid=maas --pidfile=/run/maas-cluster.pid \
        --logfile=/var/log/maas/pserv.debug maas-pserv --config-file=/etc/maas/pserv.yaml

stop maas-clusterd
start maas-clusterd
