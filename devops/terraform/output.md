https://www.terraform.io/docs/configuration/outputs.html

output "ip" {
  value = "${aws_eip.ip.public_ip}"
}

El value que queremos pintar seguramente lo podemos obtener preguntando a "terraform plan"
Para saber que queremos pintar seguiremos el esquema.
PROVIDER.RECURSO.CLAVE


Tras aplicar un "terraform apply", al final de la ejecucción saldrán los outputs que tengamos confifurados.

Tambien podemos consultar a posteriori estos outputs con:
terraform output NOMBREOUTPUT


Si intentamos hacer un output de un resource no definido obtendremos un error:
* output 'mi_ip': unknown resource 'openstack_compute_floatingip_v2.masdiip' referenced in variable openstack_compute_floatingip_v2.masdiip.addressv2


Si intentamos hacer un output de una variable que no existe, simplemente no veremos nada en el output, se ignorará.
