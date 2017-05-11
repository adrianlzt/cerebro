https://docs.docker.com/engine/userguide/networking/configure-dns/

Fuerza las dns en el /etc/resolv.conf
docker run --rm -it --dns="10.95.121.180" centos


Si lo necesitamos en un build tendremos que ponerlo en el daemon de docker
http://stackoverflow.com/questions/24151129/docker-network-calls-fail-during-image-build-on-corporate-network
En arch:
/etc/systemd/system/multi-user.target.wants/docker.service


Cuando creamos redes de usuario, se monta un servidor DNS gestionado por docker en 127.0.0.11
Podemos consultar por los nombres de las máquinas conectadas a esa network para obtener sus IPs.
