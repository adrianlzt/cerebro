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
