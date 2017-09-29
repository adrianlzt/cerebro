Generar inventario de ansible a partir de terraform:
https://github.com/jonmorehouse/terraform-provisioner-ansible/issues/29
https://github.com/wjam/terraform/commit/a51f10154421549b54dad14e6f5634b7c25cd248
https://github.com/hashicorp/terraform/issues/2661#issuecomment-248563921
https://github.com/jonmorehouse/terraform-provisioner-ansible
https://github.com/adammck/terraform-inventory

Al final yo tomé la opción de usar un inventario dinámico apuntando al provider donde había desplegado la infra.
Es decir, terraform despliegua sobre openstack, por ejemplo, y luego se ejecuta ansible con un inventario dinámico para openstack.
