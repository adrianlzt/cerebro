https://docs.docker.com/installation/centos/


# Centos 7
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install docker-ce
Mirar lvm.md si queremos usar el drive lvm-direct
systemctl start docker
docker run hello-world



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



