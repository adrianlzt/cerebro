http://ceph.com/ceph-storage/object-storage/

Ceph Object Gateway is an object storage interface built on top of librados to provide applications with a RESTful gateway to Ceph Storage Clusters. Ceph Object Storage supports two interfaces:
  S3-compatible: Provides object storage functionality with an interface that is compatible with a large subset of the Amazon S3 RESTful API.
  Swift-compatible: Provides object storage functionality with an interface that is compatible with a large subset of the OpenStack Swift API.

# Instalación
Usaremos ceph-deploy para desplegar rgw sobre los nodos que ya tengamos.
Duda: el gateway lo desplegamos sobre los monitores o los osd?
  Tip DO NOT mount kernel clients directly on the same node as your Ceph Storage Cluster, because kernel conflicts can arise. However, you can mount kernel clients within virtual machines (VMs) on a single node.
  http://docs.ceph.com/docs/master/rados/troubleshooting/troubleshooting-pg/
  el rgw se considera un cliente?

ceph-deploy install --rgw nodo1
  instala ceph y ceph-radosgw

ceph-deploy rgw create nodo1
  crea un nuevo Ceph Object Gateway (RGW) y lo pone a correr (puerto 7480)

Testear:
curl http://localhost:7480
  debemos recibir un XML


# SSL
http://docs.ceph.com/docs/master/install/install-ceph-gateway/#using-ssl-with-civetweb


# Bucket sharding
http://docs.ceph.com/docs/master/install/install-ceph-gateway/#configure-bucket-sharding

Si preevemos muchos objetos para un mismo bucket podemos hacer dos cosas (muchos elementos impactan en la performance).
Limitar el número máximo de elementos.
Hacer sharding del bucket (desactivado por defecto)


# Usuarios
## SWIFT
http://docs.ceph.com/docs/master/install/install-ceph-gateway/#create-a-swift-user

## S3
http://docs.ceph.com/docs/master/install/install-ceph-gateway/#create-a-radosgw-user-for-s3-access

Crear un usuario para acceder a la API de S3 (ejecutar en el gateway host):
radosgw-admin user create --uid="testuser" --display-name="First User"
  apuntar las claves que aparecen en el JSON devuelto (access_key, secret_key)
  Cuidado que alguna de estas claves no tenga un simbolo "\" porque puede ser que esté escapando algún simbolo. Lo fácil, crear de nuevo el user

Testear acceso creando un pequeño programa en python2 que use la libreria boto:
http://docs.ceph.com/docs/master/install/install-ceph-gateway/#test-s3-access
Si tarda más de unos pocos segundos seguramente algo va mal.

Ejemplo en php: object_client.php
