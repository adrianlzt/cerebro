# Aumentar tamaño disco
https://cloud.google.com/compute/docs/disks/add-persistent-disk?authuser=1#resize_partitions

# Añadir keys con terraform
metadata = {
  ssh-keys = "${var.gce_ssh_user}:${file(var.gce_ssh_pub_key_file)}"
}
