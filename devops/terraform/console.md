https://developer.hashicorp.com/terraform/cli/commands/console

terraform console

Ejemplos:
echo 'split(",", "foo,bar,baz")' | terraform console
tolist([
  "foo",
  "bar",
  "baz",
])


Podemos arrancarlo donde tengamos un deployment y consultar variables:
> vars.apps.foo

Parece que si llamo a un módulo, solo puedo trabajar con sus ouputs.
