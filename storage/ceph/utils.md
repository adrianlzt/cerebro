Parece que radula es mejor que s3cmd y encima soporta profiles.


https://github.com/bibby/radula
cli basada en boto
pip install radula
  usar python2

Otra simple: https://github.com/ceph/obo
Python2. Me falla al instalar gevent


Crear ~/.boto con los distintos profiles (credenciales)
/root/.boto
[Credentials]
aws_access_key_id = QO2K1W
aws_secret_access_key = Wmyl

Se puede definir todo (credentials, s3, boto) en el ~/.boto

Crear /etc/boto.cfg con el servidor, puerto y su usa ssl

/etc/boto.cfg
[s3]
host = store
port = 7480
[Boto]
is_secure = False

Listar los perfiles:
radula profiles

Usar un profile determinado:
radula -p XXX ...

Listar buckets:
radula lb

Crear un bucket
radula make-bucket nombre

radula keys/ls/list para listar contenido de un bucket
radula ls bucket

radula info bucket/fichero | jq
  info sobre el fichero

Subir ficheros:
radula up fichero bucket/
radula up -t 16 "local/*" my-new-bucket/

Podemos poner -i,--ignore-existing para ignorar archivo que ya existen (https://github.com/bibby/radula/issues/9#issuecomment-299021841)

Descargar
radula dl BUCKET/FICHERO
Subida/bajada recursiva:
https://github.com/bibby/radula/issues/8#issuecomment-299024816

Más comandos, rollo administrativo, en rgw.md


## ACL
Permitir acceso público a un objeto:
radula -p test set-acl app-test/313bc90f42e83bb16bcb97d4 public-read
    si solo especificamos un bucket, cambiará todos los objetos del bucket y la default del bucket



# rclone
Migrar datos entre distintos object storage

rclone config
  wizard para configurarlo

Config en ~/.config/rclone/rclone.conf
Ejemplo:
[test]
type = s3
provider = Ceph
env_auth = false
access_key_id = REDACTED
secret_access_key = REDACTED
endpoint = corp.us
acl = public-read
``````
Podemos definir ahí el endpoint de ceph a mano con http://1.2.3.4:8080 si no queremos usar tls

Directorios/buckets en un remote:
rclone --no-check-certificate lsd nombreRemote:

Sync entre dos buckets (pasa por local, ignorando certs)
rclone --no-check-certificate copy --progress A:bucketenA B:bucketenB



# s3cmd
https://github.com/s3tools/s3cmd
Official s3cmd repo -- Command line tool for managing Amazon S3 and CloudFront services http://s3tools.org/s3cmd
https://lollyrock.com/articles/s3cmd-with-radosgw/
https://s3tools.org/usage
Parece que la gente usa s3cmd para gestionar

Generar config de modo iterativo: s3cmd --configure
  poner access y secret key
  en el endpoint poner nuestro server: xxx.com:1234
  DNS-style bucket+... poner xxx.com:1234
  el resto "intro"
Config en ~/.s3cfg

pip install s3cmd

Ejemplos de uso en rgw.md





# obsync
mejorar usar rclone
https://github.com/dreamhost/obsync
  fork mas actualizado que el oficial de ceph, aunque ambos antiguos (2013)
http://docs.ceph.com/docs/argonaut/man/1/obsync/

boto_tool.py: s3cmd-like tool for operating on s3
A lot of common s3 clients can't handle weird names.
But this little script can do it!

obsync.py: the object synchronizer
Sincronizar entre buckets o entre directorios y buckets

Requisitos:
pip install boto lxml pyxattr
  necesita libffi y gcc para compilar

Arreglos:
shebang con /usr/bin/env python
añadido port al S3Connection

Ejemplos:
Listar buckets
AKEY=NU378EA SKEY="WMdXW" ./boto_tool store-2 -l

Contenido de un bucket:
AKEY=NU378EA SKEY="WMdXW" ./boto_tool store-2 -b my-new-bucket -l

Sincronizar dos buckets (boto no me deja cambiar el puerto, usará 80 o 443 si es secure):
SRC_AKEY=X SRC_SKEY=X DST_AKEY=X DST_SKEY=X SRC_SECURE=yes DST_SECURE=yes python obsync -v --src-type=s3 --src-host=ceph.domain.com --src-bucket=test-orig --dst-type=s3 --dst-host=ceph.domain.com --dst-bucket=test-dest

