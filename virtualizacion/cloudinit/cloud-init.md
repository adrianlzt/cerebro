http://cloudinit.readthedocs.org/en/latest/
https://www.youtube.com/watch?v=-zL3BdbKyGY
http://bazaar.launchpad.net/~cloud-init-dev/cloud-init/trunk/files/head:/doc/examples/
https://access.redhat.com/articles/rhel-atomic-cloud-init-faq

Everything about cloud-init, a set of python scripts and utilities to make your cloud images be all they can be!
Cloud-init is the defacto multi-distribution package that handles early initialization of a cloud instance.

Scripts que se pasan a una máquina recién creada para realizar funciones básicas: 
  definir el locale
  definir hostname
  generar keys ssh
  añadir usuarios para acceso por key
  definir puntos de montaje temporales


La idea es que la imagen que arranca tenga cloud-init, realice todos los procesos del punto anterior, y pueda tambien ejecutar scripts personalizados.
De esta manera, sin tener que entrar por consola a la máquina, tendríamos una VM virtual con acceso por ssh.

Se puede ver como un puppet minimalista para máquinas virtuales.
Se pueden crear usuarios, grupos, repositorios, dns, instalar puppet, etc
http://cloudinit.readthedocs.org/en/latest/topics/examples.html


Una de las maneras de pasar valores a cloud-init es pasar un cloud-config-url en los parametros de inicializacion del kernel.
Cloud-init al arrancar hará un GET de esa url y lo ejecutará.
Asi se hace en MAAS (devops/maas/internals.md)

También se puede dejar una partición con un label específico donde estará almacenada la info.
ConfigDrive https://cloudinit.readthedocs.io/en/latest/topics/datasources/configdrive.html
Más abajo ejemplo de hacer un .iso para ConfigDrive

Todas las opciones (datasources) disponibles
https://cloudinit.readthedocs.io/en/latest/topics/datasources.html


Tipicos endpoints
http://169.254.169.254/metadata/2012-03-01/meta-data/instance-id
http://169.254.169.254/metadata/2012-03-01/meta-data/local-hostname
http://169.254.169.254/metadata/2012-03-01/meta-data/public-keys
http://169.254.169.254/metadata/2012-03-01/user-data

En Openstack:
curl http://169.254.169.254/latest/meta-data
curl http://169.254.169.254/latest/user-data
  script inyectado al arranque

Podemos usar la extension de Chrome "REST Console" para generar el auth header para usar oauth.


Se ejecuta mediante el script
/etc/rc3.d/S51cloud-init

En /var/lib/cloud podemos encontrar ficheros relativos a la ejecucción.

Y los ficheros de log:
/var/log/cloud-init.log
/var/log/cloud-init-output.log


# Reejecutar
Por el orden y comandos vistos en las units de systemd

cloud-init clean
cloud-init -d init
cloud-init -d modules --mode=config
cloud-init -d modules --mode=final



# Config
Ficheros de config:
/etc/cloud/
/run/cloud-init/cloud.cfg

# Logs
/var/log/cloud-init-output.log
/var/log/cloud-init.log

# System units
cloud-init-local.service
cloud-init.service (after cloud-init-local)
cloud-config.service (after cloud-config.target)
cloud-final.service (after cloud-config.service)


# ConfigDrive .iso
https://blog.condi.me/qemu-config-drive/


cat <<EOF > user-data
#!
touch /tmp/cloud.user-data
EOF

cat <<EOF > meta-data
instance-id: id-12345
local-hostname: cloudy
EOF

truncate -s 2M cloudconfig.img
/usr/sbin/mkfs.vfat -n cidata cloudconfig.img
mcopy -oi cloudconfig.img user-data meta-data ::

Añadir el disco como Almacenamiento tipo VirtIO:
-drive file=cloudconfig.img,if=virtio,format=raw

