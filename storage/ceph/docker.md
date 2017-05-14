http://ceph.com/ceph-docker
https://github.com/ceph/ceph-docker
http://ceph.com/geen-categorie/ceph-cluster-on-docker-for-testing/
https://www.youtube.com/watch?v=FUSTjTBA8f8&feature=youtu.be

Para testing


# Sobre docker swarm - ToDo
docker network create --driver overlay ceph

En cada nodo
mkdir -p /ceph/{etc,lib}
docker run -d -v /ceph/etc:/etc/ceph -v /ceph/lib:/var/lib/ceph -e MON_IP=192.168.0.69 -e CEPH_PUBLIC_NETWORK=192.168.0.0/24 ceph/daemon mon
