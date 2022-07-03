https://www.terraform.io/docs/configuration/outputs.html

output "ip" {
  value = "${aws_eip.ip.public_ip}"
  description = "opcional"
  depends_on = ["TYPE.NAME", "recursos.que_deben_terminar_antes"]
  sensitive = true # se almacenan en el state, pero no se muestran al hacer apply ni refresh (pero si con output)
}

El value que queremos pintar seguramente lo podemos obtener preguntando a "terraform plan"
Para saber que queremos pintar seguiremos el esquema.
PROVIDER.RECURSO.ATRIBUTO
Podemos ver tambien los atributos disponibles en la web del recurso, por ejemplo: https://www.terraform.io/docs/providers/openstack/r/compute_instance_v2.html#attributes-reference


Tras aplicar un "terraform apply", al final de la ejecucción saldrán los outputs que tengamos confifurados.

Tambien podemos consultar a posteriori estos outputs con:
terraform output NOMBREOUTPUT


Si queremos recargar los outputs (tras modificar la config, o que se haya modificado el provider):
terraform refresh


Si intentamos hacer un output de un resource no definido obtendremos un error:
* output 'mi_ip': unknown resource 'openstack_compute_floatingip_v2.masdiip' referenced in variable openstack_compute_floatingip_v2.masdiip.addressv2


Si intentamos hacer un output de una variable que no existe, simplemente no veremos nada en el output, se ignorará.


# Arrays
Si queremos sacar un array deberemos meterlo entre corchetes (en algunos outputs he visto que no era necesario):
value = ["${variable.que.es.un.array}"]

Parece que no podemos pasar como output una lista de arrays generada por un recurso con count.
Yo queria pasar algo de este tipo:
openstack_compute_instance_v2.vms.*
Pero no veo la forma de hacerlo.

Aunque si puedo sacar un array de maps con:
${openstack_compute_instance_v2.vms.*.network}


# Splash / multiples variables
```
output "public_ips" {
  value = ["${aws_instance.example.*.public_ip}"]
}
```
