https://infinit.sh/

Otra opción que parece simplifica mucho.
Añades todos los tipos de storage que quieres y el te crea una ¿api? donde conectar docker.

En alpha (8/4/2017)
Infinit is still in alpha and will be considered production ready for its 1.0 release.
Infinit provides a free community version and an enterprise license with additional features — see our pricing page.

Comparación con otros sistemas de almacenamiento: https://infinit.sh/faq?q=&hPP=20&idx=infinit_sh_faq&p=0&is_v=1


# Conceptos
Users
Networks: junta varios silos en una unida unidad logica
Silos: donde se almacena la información, pueden ser directorios, S3, etc 
Volumes: son los file systems
Hub: servidor publico de infinit donde se publica la informacion para poder sincronizar entre volumes, networks, users, etc



# Instalacion
https://infinit.sh/get-started

yum install -y fuse
yum-config-manager --add-repo https://yum.infinit.sh/infinit.repo
yum install -y infinit
export PATH=$PATH:/opt/infinit/bin



# Monitoring / health
infinit doctor all


# Users
Crear user (cambiar nombre)
infinit user signup --name adrian --fullname "Adrian"
Se generan los ficheros en ~/.local/share/infinit/filesystem/

Si queremos compartir un usuario (solo la clave publica. Para compartir todo poner --full):
infinit user export -a adrian -n adrian > fichero.json
Pasamos ese fichero.json a la otra maquina y ejecutamos:
infinit user import -a adrian -i fichero.json



# Silos
Crear un silo en un directorio
infinit silo create --filesystem --name infinit-storage --path /data/ --capacity 3GB



# Network
Creamos un network asociada a un user y a un silo
infinit network create --as adrian --storage infinit-storage --name my-network --push

Obtener una network desde el hub:
infinit network fetch --as adrian --name my-network

Unir un dispositivo a una red que hayamos obtenidos:
infinit network link --as adrian --name my-network



# Volume
Crear un volumen sobre una network
infinit volume create --as adrian --network my-network --name my-volume --push

Obtener una volume desde el hub:
infinit volume fetch --as adrian --name my-volume


Montar un volumen
infinit volume mount --as adrian --name my-volume --mountpoint /mnt --allow-root-creation --cache --publish
Parece que el comando se queda en foreground. En /mnt veremos el FS montado con FUSE
