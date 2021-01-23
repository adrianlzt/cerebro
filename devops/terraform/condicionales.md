https://www.terraform.io/docs/configuration/expressions/conditionals.html

CONDITION ? TRUEVAL : FALSEVAL

subnet = "${var.env == "production" ? var.prod_subnet : var.dev_subnet}"

Equality: == and !=
Numerical comparison: >, <, >=, <=
Boolean logic: &&, ||, unary !



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

