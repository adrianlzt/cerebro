https://www.terraform.io/docs/configuration/interpolation.html#conditionals

CONDITION ? TRUEVAL : FALSEVAL

subnet = "${var.env == "production" ? var.prod_subnet : var.dev_subnet}"

Equality: == and !=
Numerical comparison: >, <, >=, <=
Boolean logic: &&, ||, unary !
