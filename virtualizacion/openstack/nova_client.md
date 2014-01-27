https://github.com/major/supernova

Use novaclient with multiple nova environments the easy way

Uso: supernova entorno comando (aqui omito "supernova entorno" y uso solo nova)

Listar máquinas:
nova list

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

Levantar una máquina:
nova boot --flavor=2 --image=f45b4de7-6013-4eb9-8df4-133b913ffb40 --key-name=raxLondon NOMBRE-VM
  --num-instances <n>  numero de instancias que arrancar
  --meta <key=value>   valores que se almacenan en /meta.js
  --file <dst-path=src-path>   poner ficheros locales en la VM
  --key-name <key-name>   pareja de claves, previamente creadas
  --user-data <user-data>  user data file to pass to be exposed by the metadata server??

El comando nos devuelve cierta información de la máquina.
Un valor importante es 'adminPass', que es la password de root, y no podremos volver a conseguirla.
El usuario parece que siempre es root, asi que para conectar a la máquina, obtendríamos la ip pública con: nova show NOMBRE-VM, y haríamos:
ssh -i ~/.rackspace/rax root@ip.publica
O sin la clave privada usando el 'adminPass'





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



