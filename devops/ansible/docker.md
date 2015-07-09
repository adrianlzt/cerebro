http://docs.ansible.com/docker_module.html

Depedencias necesarias en centos 7:
- name: install pip to install latest python modules
  yum: name=python-pip state=present

- name: install requisites to update websocket
  yum: name={{item}} state=present
  with_items:
    - gcc
    - python-devel

# https://github.com/docker/compose/issues/1288
# https://github.com/ansible/ansible-modules-core/issues/481 
- name: install latest version of several python packages
  pip: name={{item}} state=latest
  with_items:
    - websocket
    - six
    - urllib3

# https://github.com/ansible/ansible/issues/10879
- name: install docker-py to manage docker with ansible
  pip: name=docker-py version=1.1.0 



- name: data container
  docker:
    name: mydata
    image: busybox
    state: present
    volumes:
    - /data

- name: redis container
  docker:
    name: myredis
    image: redis
    command: redis-server --appendonly yes
    state: started
    expose:
    - 6379
    volumes_from:
    - mydata


# Errores
docker_api_version=docker.client.DEFAULT_DOCKER_API_VERSION
AttributeError: 'module' object has no attribute 'DEFAULT_DOCKER_API_VERSION'

https://github.com/ansible/ansible/issues/10879
usar docker-py version=1.1.0



docker_api_version = dict(default=docker.client.DEFAULT_DOCKER_API_VERSION),
NameError: global name 'docker' is not defined
Faltaban unas librerias.
Probar con 
# python
> import docker




Bajando imagen de un repo https propio:
msg: failed to pull the specified image: 
Ejecutando el script python creando en la máquina remota en ~/.ansible/tmp veo
/usr/lib/python2.7/site-packages/requests/packages/urllib3/util/ssl_.py:90: InsecurePlatformWarning: A true SSLContext object is not available. This prevents urllib3 from configuring SSL appropriately and may cause certain SSL connections to fail. For more information, see https://urllib3.readthedocs.org/en/latest/security.html#insecureplatformwarning.
  InsecurePlatformWarning
  {"msg": "failed to pull the specified image: someweb.inet/logstash", "failed": true}

También veo que ejecutando direcamente docker pull si puedo bajar la imagen

El problema es que la libreria docker-py que usa ansible para comunicarse con docker hace uso de la libreria python requests para bajarse la imagen, y dicha libreria tiene sus certifiacdos en /usr/lib/python2.7/site-packages/requests/cacert.pem

Al usar el binario de docker se leen de /etc/docker/certs.d/ por eso ese si funciona.

Tenemos que agregar nuestro certificado al cacert de requests
