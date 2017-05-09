https://github.com/bibby/radula
cli basada en boto

Crear ~/.boto con los distintos profiles (credenciales)
/root/.boto
[Credentials]
aws_access_key_id = QO2K1W
aws_secret_access_key = Wmyl

Crear /etc/boto.cfg con el servidor, puerto y su usa ssl

/etc/boto.cfg
[s3]
host = store
port = 7480
[Boto]
is_secure = False

Listar los perfiles:
radula profiles

Listar buckets:
radula lb

radula keys/ls/list para listar contenido de un bucket
https://github.com/bibby/radula/issues/7#issuecomment-299020700

Subir ficheros:
radula up -t 16 "local/*" my-new-bucket/

Podemos poner -i,--ignore-existing para ignorar archivo que ya existen (https://github.com/bibby/radula/issues/9#issuecomment-299021841)

Subida/bajada recursiva:
https://github.com/bibby/radula/issues/8#issuecomment-299024816



https://github.com/s3tools/s3cmd
Official s3cmd repo -- Command line tool for managing Amazon S3 and CloudFront services http://s3tools.org/s3cmd

pip install s3cmd
Parece que harian falta modificacinoes para poder usarlo con ceph





https://github.com/dreamhost/obsync
  fork mas actualizado que el oficial de ceph, aunque ambos antiguos (2013)
http://docs.ceph.com/docs/argonaut/man/1/obsync/

boto_tool.py: s3cmd-like tool for operating on s3
A lot of common s3 clients can't handle weird names.
But this little script can do it!

obsync.py: the object synchronizer
Sincronizar entre buckets o entre directorios y buckets

Requisitos:
pip install boto lxml xattr

Arreglos:
shebang con /usr/bin/env python
añadido port al S3Connection

Ejemplos:
Listar buckets
AKEY=NU378EA SKEY="WMdXW" ./boto_tool store-2 -l

Contenido de un bucket:
AKEY=NU378EA SKEY="WMdXW" ./boto_tool store-2 -b my-new-bucket -l
