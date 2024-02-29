https://www.terraform.io/docs/configuration/expressions/conditionals.html

CONDITION ? TRUEVAL : FALSEVAL

subnet = "${var.env == "production" ? var.prod_subnet : var.dev_subnet}"

Equality: == and !=
Numerical comparison: >, <, >=, <=
Boolean logic: &&, ||, unary !

Si queremos usar el default value de un módulo al que llamamos:
image = foo == 1 ? null : "mi valor"
Pero la variable "image" tendrá que estar definida con "nullable = false"



Crear un recurso segun si una variable esta a 1 o 0:
count = "${var.create_eip}"
...
create_eip = true/false


Crear recurso si otra variable si no comienza por 't':
replace(var.instance_type, "/^[^t].*/", "0")


# If-else
resource condicional true {
  count = "${var.create_eip}"
}
resource condicional false {
  count = "${1 - var.create_eip}"
}



# List comprehension
[for s in var.list : upper(s)]
{for s in var.list : s => upper(s)}
