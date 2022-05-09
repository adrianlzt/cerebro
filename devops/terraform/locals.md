Ejemplo:

Declarandolas:
locals {
    ost_instance_count = "${var.cloud_provider == "ost" ? var.instance_count : 0}"
    oci_instance_count = "${var.cloud_provider == "oci" ? var.instance_count : 0}"
}

Usándolas:
        for instance_n in range(local.ost_instance_count):

