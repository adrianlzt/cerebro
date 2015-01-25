https://github.com/major/supernova

Use novaclient with multiple nova environments the easy way

Uso: supernova entorno comando (aqui omito "supernova entorno" y uso solo nova)

Listar máquinas:
nova list

Acceder a una máquina (necesita una ip flotante accesible):
nova ssh NOMBRE
nova ssh NOMBRE --network uuid

Info de una máquina:
nova show nombreMaquina

Lista de tipos de máquinas disponibles:
nova flavor-list

Lista de imágenes disponibles:
nova image-list

Más info de una imagen:
nova image-show <id-imagen>

Keypairs:
nova keypair-add --pub-key ~/.rackspace/rax.pub raxLondon
nova keypair-{list,show,delete}

Availability zones:
nova availability-zone-list

Security groups:
nova secgroup-list

Levantar una máquina:
nova boot --flavor NOMBRE --image NOMBREIMG --key-name raxLondon --security-groups todo_abierto,otro --nic net-id=a46asd7-2345-34-234as NOMBRE-VM
  --num-instances <n>  numero de instancias que arrancar
  --meta <key=value>   valores que se almacenan en /meta.js
  --file <dst-path=src-path>   poner ficheros locales en la VM
  --key-name <key-name>   pareja de claves, previamente creadas
  --user-data <user-data> ponemos un fichero local que será el que ejecute cloud-init


nova --insecure boot --image=IMAGEN --flavor=SABOR --key-name=CLAVES --nic net-id=145094f1-2c8d-40d0-82f3-2997c4aa1bcc --nic net-id=bdbf444d-8ddd-4b8c-b534-69a2936d88be --availability-zone availzone1 nombre-maquina
  creo maquina con dos interfaces de red, cada una conectada a una de las redes internas que hayamos creando antes. Tambien elijo que se cree en una zona determinada.

El comando nos devuelve cierta información de la máquina.
Un valor importante es 'adminPass', que es la password de root, y no podremos volver a conseguirla.
El usuario parece que siempre es root, asi que para conectar a la máquina, obtendríamos la ip pública con: nova show NOMBRE-VM, y haríamos:
ssh -i ~/.rackspace/rax root@ip.publica
O sin la clave privada usando el 'adminPass'

nova console-log NOMBREVM

nova delete NOMBREVM



Lista de comandos: https://github.com/openstack/python-novaclient

Para ver un uso con rackspace mirar adrianRepo/nube/rackspace/api_nova.md

Instalación:
pip install supernova (tiene como dependencia al cliente nova: apt-get install python-novaclient)

Para más seguridad, almacenar las credenciales en un keyring (http://docs.rackspace.com/servers/api/v2/cs-gettingstarted/content/section_gs_install_supernova.html)

Configuración (variables):
~/.supernova (ejemplo web):
[production]
OS_AUTH_URL = http://production.nova.example.com:8774/v1.1/
OS_USERNAME = jsmith
OS_PASSWORD = fd62afe2-4686-469f-9849-ceaa792c55a6
OS_TENANT_NAME = nova-production

[development]
OS_AUTH_URL = http://dev.nova.example.com:8774/v1.1/
OS_USERNAME = jsmith
OS_PASSWORD = 40318069-6069-4d9f-836d-a46df17fc8d1
OS_TENANT_NAME = nova-development



