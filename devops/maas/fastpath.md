http://bazaar.launchpad.net/~curtin-dev/curtin/trunk/view/head:/doc/topics/overview.rst
http://astokes.org/customizing-fastpath-curtin-installations/


A usage of curtin will go through the following stages:

- Install Environment boot
- Early Commands
- Partitioning
- Network Discovery and Setup
- Extraction of sources
- Hook for installed OS to customize itself
- Final Commands


Si instalamos con fastpath (curtin), el fichero pxe será estilo:

nomodeset iscsi_target_name=iqn.2004-05.com.ubuntu:maas:ephemeral-ubuntu-i386-generic-trusty-release iscsi_target_ip=192.168.1.49 iscsi_target_port=3260 iscsi_initiator=outlying-police ip=::::outlying-police:BOOTIF ro root=/dev/disk/by-path/ip-192.168.1.49:3260-iscsi-iqn.2004-05.com.ubuntu:maas:ephemeral-ubuntu-i386-generic-trusty-release-lun-1 overlayroot=tmpfs cloud-config-url=http://192.168.200.10/MAAS/metadata/latest/by-id/node-68bd777a-a980-11e4-bf88-525400520a44/?op=get_preseed log_host=192.168.200.10 log_port=514

El preseed:
#cloud-config
datasource:
  MAAS: {consumer_key: GSf2CB2vhAxXEMwfUr, metadata_url: 'http://192.168.200.10/MAAS/metadata/curtin',
    token_key: 9hrxmfd7EGxpCXsCy9, token_secret: JfCasfBEPA6nmHYMbwC5px7nJTTY7Hrz}


Cloud-init preguntará por los siguientes valores (https://github.com/number5/cloud-init/blob/26ea5244585c25a396be139336948154222675f4/cloudinit/sources/DataSourceMAAS.py)
http://192.168.1.49/MAAS/metadata/curtin/2012-03-01/meta-data/instance-id
http://192.168.1.49/MAAS/metadata/curtin/2012-03-01/meta-data/local-hostname
http://192.168.1.49/MAAS/metadata/curtin/2012-03-01/meta-data/public-keys
http://192.168.1.49/MAAS/metadata/curtin/2012-03-01/user-data

Podemos usar la extension de Chrome "REST Console" para generar el auth header para usar oauth.

Con user-data nos bajaremos un shell script. Este shell script lleva codificado en base64 curtin mas unos ficheros de configuracion.
He dejado uno de ejemplo en este directorio, en curtin.sh
Podemos ver el contenido (lo guardará en curtin/) con:
./curtin.sh -v --no-execute

El shell script lo que hace es descomprimirlo y ejecutar:
curtin install --config=configs/config-000.cfg --config=configs/config-001.cfg --config=configs/config-002.cfg --config=configs/config-003.cfg http://192.168.200.10/MAAS/static/images/ubuntu/i386/generic/trusty/release/root-tgz

Estas configuraciones se generan en:
/usr/lib/python2.7/dist-packages/maasserver/preseed.py
def get_curtin_userdata(node):

El config-000 define el servidor de metadata, la auth, marca el nodo para que arranque desde el disco duro y configura los apt de ubuntu mediante el proxy

El config-001 parece que configura un endpoint donde curtin irá enviando como va el estado de la instalacion: MAAS/metadata/curtin/latest/?op=signal

El config-002 configura la red. Genera unos ficheros en /tmp con el contenido de /etc/network/interfaces y otro de udev_persistent_net para definir la MAC

El config-003 mueve esos ficheros de /tmp a sus ubicaciones correctas al final (late-commands): /etc/network/interfaces y /etc/udev/rules.d/70-persistent-net.rules


Si queremos ejecutarlo a mano, podemos descomprimirlo:
./curtin.sh -v --no-execute
Modificar las configuraciones si hace falta (la ip de los endpoints).
Luego setear el path de PYTHON
export PYTHONPATH=$PYTHONPATH:/donde/se/haya/descomprimido/curtin
./bin/curtin -v --log-file curtin.log install --config=configs/config-000.cfg --config=configs/config-001.cfg --config=configs/config-002.cfg --config=configs/config-003.cfg http://192.168.200.10/MAAS/static/images/ubuntu/i386/generic/trusty/release/root-tgz


Me gustaria ver como funciona curtin cuando lo usa MAAS. Yo si lo intento usar no veo como hace para particionar el disco, etc.



# Comandos
pack: genera el script shell con curtin encriptado en base64

block-meta: parece que es el que formatea el disco y hace el volcado del tgz:
wget "$1" --progress=dot:mega -O - | tar -SxOzf - | dd of="$2"

curthooks: operaciones varias como escribir ficheros, crear swap, actualizar interfaces, etc.

extract: extraer tgz a un directorio? 

