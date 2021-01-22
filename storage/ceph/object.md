http://ceph.com/ceph-storage/object-storage/

Ceph Object Gateway is an object storage interface built on top of librados to provide applications with a RESTful gateway to Ceph Storage Clusters. Ceph Object Storage supports two interfaces:
  S3-compatible: Provides object storage functionality with an interface that is compatible with a large subset of the Amazon S3 RESTful API.
  Swift-compatible: Provides object storage functionality with an interface that is compatible with a large subset of the OpenStack Swift API.

RGW mantiene un índice de metadatos de lo que tiene almacenado en cada bucket (RADOS, la capa por debajo, no lo ofrece)

# Instalación
Mejor desplegar con ansible

Usaremos ceph-deploy para desplegar rgw sobre los nodos que ya tengamos.
Duda: el gateway lo desplegamos sobre los monitores o los osd?
  Tip DO NOT mount kernel clients directly on the same node as your Ceph Storage Cluster, because kernel conflicts can arise. However, you can mount kernel clients within virtual machines (VMs) on a single node.
  http://docs.ceph.com/docs/master/rados/troubleshooting/troubleshooting-pg/
  el rgw se considera un cliente?

ceph-deploy install --rgw nodo1
  instala ceph y ceph-radosgw

ceph-deploy rgw create nodo1
  crea un nuevo Ceph Object Gateway (RGW) y lo pone a correr (puerto 7480)

Testear (mirar ip:puerto en: grep civetweb /etc/ceph/ceph.conf)
curl http://localhost:7480 (ansible lo pone en el :8080)
  debemos recibir un XML


# SSL
http://docs.ceph.com/docs/master/install/install-ceph-gateway/#using-ssl-with-civetweb

Añadir a /etc/ceph/ceph.conf
[client.rgw.HOSTNAME]
rgw_frontends = civetweb port=7480+7443s ssl_certificate=/etc/ceph/private/keyandcert.pem

Siendo HOSTNAME el nombre del host (hostname -s).
El cert debe ser la concatenación de los certificados, intermedios y la clave.

systemctl restart ceph-radosgw@rgw.HOSTNAME
Si falla mirar los logs en /var/log/ceph/ceph-client.rgw*



# Bucket sharding (automático a partir de Luminous)
http://docs.ceph.com/docs/master/install/install-ceph-gateway/#configure-bucket-sharding

Si preevemos muchos objetos para un mismo bucket podemos hacer dos cosas (muchos elementos impactan en la performance).
Limitar el número máximo de elementos.
Hacer sharding del bucket (desactivado por defecto)

https://ceph.com/community/new-luminous-rgw-dynamic-bucket-sharding/
A partir de Luminous se gestiona automáticamente y está por defecto. No tenemos que hacer nada


# Usuarios
## SWIFT
http://docs.ceph.com/docs/master/install/install-ceph-gateway/#create-a-swift-user

## S3
http://docs.ceph.com/docs/master/install/install-ceph-gateway/#create-a-radosgw-user-for-s3-access

Listar usuarios
radosgw-admin user list

Crear un usuario para acceder a la API de S3 (ejecutar en el gateway host):
radosgw-admin user create --uid="testuser" --display-name="First User"
  apuntar las claves que aparecen en el JSON devuelto (access_key, secret_key)
  Cuidado que alguna de estas claves no tenga un simbolo "\" porque puede ser que esté escapando algún simbolo. Lo fácil, crear de nuevo el user

Info de un user:
radosgw-admin user info --uid=joe
  con este comando podemos ver su access and secret key

Ejemplo en php: object_client.php

Testear con el programa python radula (mirar utils.md)



# Administracion y consulta

## radosgw-admin
### Buckets
Listar buckets:
radosgw-admin bucket list

Renombrar (a partir de v15, octopus):
radosgw-admin bucket link --bucket=prod-clone --bucket-new-name=development

Borrar bucket y su contenido (CUIDADO!):
radosgw-admin bucket rm --bucket NOMBRE --purge-objects

## Ejemplos de comandos con s3cmd y radula

s3cmd ls
radula lb
  listar buckets

s3cmd mb s3://nombre
  crear bucket

s3cmd du -H s3://nombre
  espacio utilizado y número de objetos

radula info nombre
  radula aqui nos da espacio ocupado, número de objetos, el más nuevo y el más grande


## ACL
Parece que si tenemos un bucket con objetos ya creados, aunque modifiquemos el ACL del bucket, esto no cambia los objetos que ya estaban almacenados. Tendremos que hacer una modificación recursiva.
Pero a partir de la modificación, los nuevos ficheros subidos si tendrán los permisos del ACL del bucket.

Hay 5 permisos posibles, que pueden ser aplicados sobre un bucket o un objeto:
  READ:
    bucket: listar en el bucket
    objeto: leer los datos y metadatos del objeto
  WRITE:
    bucket: crear, sobrescribir y eliminar objetos del bucket
  READ_ACP: permite leer la ACL (del bucket u objeto)
  WRITE_ACP: permite modificar la ACL (del bucket u objeto)
  FULL_CONTROL: los 4 anteriores juntos

ACL que permite bjar objetos de un bucket "notifier" pero no listar:
https://gist.github.com/3873876d87da2b8a18f3d92d3d5e304d

radula get-acl nombre
  info sobre acls de un bucket

s3cmd info s3://nombre
  info varia, sobre todo nos interesa las ACL

radula -p prod -rw allow cephnfs prueba
  "allow" y "allow-user" es lo mismo
  dar permisos al usuario "cephnfs" sobre todos los elementos del bucket "prueba"
  esto irá elemento a elemento poniendo la ACL

s3cmd setacl s3://joe-bucket --acl-grant=all:tom --recursive
  da todos los permisos al usuario "tom" sobre el bucket "joe-bucket"

Permitir acceso público a un objeto:
radula -p test set-acl app-test/313bc90f42e83bb16bcb97d4 public-read
  si solo especificamos un bucket, cambiará todos los objetos del bucket



## Elasticsearch
https://ceph.com/rgw/new-luminous-rgw-metadata-search/
radosgw-es

Parece que podemos usar ES para almacenar los metadatos de los objetos almacenados en Ceph RGW y de esta manera poder encontrarlos más fácilmente.



# NFS
https://www.sebastien-han.fr/blog/2016/12/23/Ceph-Rados-Gateway-and-NFS/
http://docs.ceph.com/docs/mimic/radosgw/nfs/
Se puede exportar los pools como NFS

Instalar con ceph-ansible
cp group_vars/nfss.yml.sample  group_vars/nfss.yml
Y editar ahi la config

Si definimos un user se chequea si el usuario configurado ya existe para evitar su creación
https://github.com/ceph/ceph-ansible/pull/3265/files

Si cambiamos la config:
systemctl restart nfs-ganesha.service

Solo nos mostrará los buckets de los que el usuario es owner.
Si le damos permisos a ese usuario sobre otro bucket no aparecerá (como tampoco veremos ese bucket con list-buckets)


Esto a priori no nos da HA. Tendremos que montarla a parte.


## Cliente
mount -t nfs -o nfsvers=4.1,noauto,soft,sync,proto=tcp 127.0.0.1:/ /mnt
Tenemos que tener instalado el cliente nfs (mirar adrianRepo/linux/filesystems/nfs/nfs.md)

Para /etc/fstab
<ganesha-host-name>:/ <mount-point> nfs noauto,soft,nfsvers=4.1,sync,proto=tcp 0 0



Probando a mover ficheros con el nfs veo alguna inconsistencia. Algún tipo de cache de metadatos?
  - cliente1 crea fichero X
  - cliente2 accede al fichero
  - cliente2 borra el fichero
  - cliente1 vuelve a crear el fichero X
  - cliente2 intenta acceder pero da que no existe
