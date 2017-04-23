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
