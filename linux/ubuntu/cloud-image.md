https://cloud-images.ubuntu.com/

Para definir un password al user ubuntu (si no, tendrá uno random que escribirá por consola):
virtualizacion/cloudinit/cloud-init-image/leeme.md

Hace falta habilitar el acceso por ssh con clave:
/etc/ssh/sshd_config
PasswordAuthentication yes


Agrandar imagen:
qemu-img resize server.img +30G
