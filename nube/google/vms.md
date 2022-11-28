# Aumentar tamaño disco
https://cloud.google.com/compute/docs/disks/add-persistent-disk?authuser=1#resize_partitions

# Formas de acceder con ssh
https://cloud.google.com/compute/docs/instances/access-overview#project-wide

- OS Login (recomendado)
- ssh keys in metadata
- temporary access
- using service accounts to grant access to applications

## OS login
https://cloud.google.com/compute/docs/oslogin

Como saber si está activado (parece que no viene por defecto)
https://cloud.google.com/compute/docs/troubleshooting/troubleshoot-os-login#checking_if_os_login_is_enabled


# Añadir keys con terraform
metadata = {
  ssh-keys = "${var.gce_ssh_user}:${file(var.gce_ssh_pub_key_file)}"
}

Otro ejemplo:
metadata = {
  ssh-keys = "${var.gce_ssh_user}:${file(var.key_pair["public_key_path"])}"
}


# Resolución DNS
https://cloud.google.com/compute/docs/internal-dns

Se ven las máquinas conectadas a la misma red.

Dos tipos:
INSTANCE_NAME.c.PROJECT_ID.internal
INSTANCE_NAME.ZONE.c.PROJECT_ID.internal

Si queremos ver cual estamos usando, usar:
curl "http://metadata.google.internal/computeMetadata/v1/instance/hostname" -H "Metadata-Flavor: Google"

Si vemos que pone zona, es que estams usando el zonal DNS
