# Aumentar tamaño disco
https://cloud.google.com/compute/docs/disks/add-persistent-disk?authuser=1#resize_partitions

# Añadir keys con terraform
metadata = {
  ssh-keys = "${var.gce_ssh_user}:${file(var.gce_ssh_pub_key_file)}"
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
