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


# Acceso a las variables
module.NAME.TIPO_RESOURCE.RESOUCE_NAME
Ejemplo:
module.assets_bucket.aws_s3_bucket.the_bucket



# soure / obtener modules
https://www.terraform.io/docs/modules/sources.html
Podemos bajar modules desde distintos providers: registry, github, bitbucket, https, s3 buckets, etc

Otra opción es usar módulos locales:
source = "./directorio"
