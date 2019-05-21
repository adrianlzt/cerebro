https://docs.docker.com/installation/centos/


# Centos 7
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install -y docker-ce

Limitar tamaño máximo del log para json-file?
/etc/docker/daemon.json
{
  "log-driver": "json-file",
    "log-opts": {
      "max-size": "10m",
    "max-file": "1"
  }
}

A partir de kernel 4.0 o centos/rhel 3.10.0-514, debemos usar overlay2, que es el que se instala por defecto, por lo que no será necesario configurar lvm.
Mejor tener un punto de montaje dedicado en /var/lib/docker

Mirar lvm.md si queremos usar el drive lvm-direct
systemctl start docker && systemctl enable docker
docker run hello-world

Tras instalar, ejecutar este script https://raw.githubusercontent.com/docker/docker/master/contrib/check-config.sh
Nos dirá si tenemos algún problema (es normal que falten algunos drivers de storage y network, posiblemente no los vamos a usar)

Buscar si tenemos algún error en
journalctl -n 100 -u docker

Este parece que no es importante (https://github.com/docker/docker/issues/13969)
Apr 08 08:59:35 dockerswarm-4 dockerd[18618]: time="2017-04-08T08:59:35.895169788Z" level=warning msg="Running modprobe bridge br_netfilter failed with message: modprobe: WARNING: Module br_netfilter not found.\

Este puede ser por esta opcion de la que queja el check-config (CONFIG_CGROUP_PIDS: missing)
Apr 08 08:59:35 dockerswarm-4 dockerd[18618]: time="2017-04-08T08:59:35.823687099Z" level=warning msg="mountpoint for pids not found"



# Centos 6 (no usar en centos6 -> problemas)

Meter epel

yum update device-mapper
yum install -y docker-io

Con OpenStack me daba un Calltrace al arrancar la imagen de logstash.
Mejor usar centos 7

Problemas que fui solucionando para poder usar ansible con docker en centos 6

# https://github.com/docker/docker/issues/12108
- name: update device-mapper
  yum: name=device-mapper state=latest

# https://github.com/ansible/ansible-modules-core/issues/481 
- name: install pip to update urllib3
  yum: name=python-pip state=present

- name: install latest version of urllib3
  pip: name=urllib3 state=latest

# https://github.com/ansible/ansible/issues/10879
- name: install docker-py to manage docker with ansible
  pip: name=docker-py version=1.1.0

- name: install docker
  yum: name=docker-io state=present

- name: enable and start docker
  service: name=docker state=started enabled=yes



