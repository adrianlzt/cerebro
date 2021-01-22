https://www.terraform.io/docs/modules/index.html
Mirar registry.md para ver donde encontrar modulos ya fabricados.
Ejemplo: https://github.com/hashicorp/terraform-google-consul/tree/master/modules/consul-cluster

Modules are used to create reusable components in Terraform as well as for basic code organization.

module NAME {
  source = SOURCE_URL
  KEY = VALUE
}

Podemos usar un módulo (parámetro source) múltiples veces.

CUIDADO! meter resources en un modulo va a cambiar su nombre, por lo tanto Terraform destruira el recurso antiguo y creará el nuevo.
Chequear con "plan" antes para ver que va a hacer.


# Variables
Para usar las variables que nos pasan dentro del módulo:
var.foo

Las declararemos en el fichero variables.terraform
variable "foo_bar" {
  description = "foo bar"
  default = 10
}

## Acceso a las variables generadas por el módulo
module.NAME.TIPO_RESOURCE.RESOUCE_NAME
Ejemplo:
module.assets_bucket.aws_s3_bucket.the_bucket

Solo podemos referenciar variables "outputted" por el module



# soure / obtener modules
https://www.terraform.io/docs/modules/sources.html
Podemos bajar modules desde distintos providers: registry, github, bitbucket, https, s3 buckets, etc

Por defecto lo buscará en el terraform registry.


Otra opción es usar módulos locales:
source = "./directorio"

terraform get
escanea nuestros fichero .tf y se baja los modulos necesarios (no me queda muy claro como funciona y que diferencia hay con "init")
Si estamos usando un module local tambien tendremos que lanzar el "terraform get".
Este comando creará unos links en .terraform/modules/HASH a nuestros modulos

Si modificamos el modulo en nuestro path, deberemos a hacer terraform get



# crear module
https://www.terraform.io/docs/modules/create.html#standard-module-structure
estructura a seguir

modulo/
  README (o README.md)
  main.tf
  variables.tf (poner comentario a todas las variables)
  outputs.tf (poner comentario a todos los outputs)


Si queremos usar en un proyecto modulos los meteremos en el directorio:
modules/


# ficheros externo
Si queremos usar un fichero externo (por ejemplo un script que queremos subir para usar "remote-exec", lo referenciaremos así:
"${path.module}/script.sh"


# Nested modules
Los modulos a su vez pueden tener otros módulos.
Los submodulos no son visibles para los que llaman al módulo.
El módulo debera encargarse de pasar las variables que se necesiten.
