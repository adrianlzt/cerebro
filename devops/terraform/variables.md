https://www.terraform.io/intro/getting-started/variables.html

Generalmente usadas para esconder keys de los ficheros de configuración y para cuando usamos un valor en repetidas ocasiones

Definición de una variable sin valor (se nos preguntará, o tendremos que pasarla como parametro)
variable "aws_access_key" {}

La usaremos como:
var.aws_access_key


Si no definimos la variable nos la preguntará por stdout.

La podemos pasar como parametro:
terraform apply -var "ost_pass=1234"

O con un fichero:
terraform.tfvars *.auto.tfvars (estos se cogerán automáticamente)

En un fichero damos valores a las variables como (NOTA: tendrán que estar definidas en algun sitio (en algún fichero .tf), ejemplo de definición: variable nombrevariable {}):
nombrevariable = "valor"



Si queremo forzar a coger un fichero:
-var-file="fichero"

Variables de entorno (solo strings):
TF_VAR_nombre


# Default
variable "aws_access_key" {
  default = "valor_si_no_se_define"
}

Type de las variables:
  string
  number
  bool (se usa como true / false)

  list
  set
  maps
  object
  tuple

# Lists
https://www.terraform.io/intro/getting-started/variables.html#lists

variable "cidrs" { default = [] }

variable "cidrs" { type = "list" }
You can specify lists in a terraform.tfvars file:

cidrs = [ "10.0.0.0/16", "10.1.0.0/16" ]

element(list, index)
Obtener un elemento de un array segun su posisción en el array

list[0]

Si son variable con count:
variable.INDICE.attr
aws_instance.web.0.id


Si tenemos una variable con muchos elementos por que se ha generado con un count, podemos acceder a los elementos con:
Parece que esta sintaxis (.NUMERO.) no podemos usarla cuando nosotros generamos el array (un output de un module por ejemplo)
aws_instance.example.0.public_ip


## concat
> concat(["a", ""], ["b", "c"])
[ "a", "", "b", "c", ]


# Maps
https://www.terraform.io/intro/getting-started/variables.html#maps

variable "amis" {
  type = "map"
  default = {
    "us-east-1" = "ami-b374d5a5"
    "us-west-2" = "ami-4b32be2b"
  }
}

"${lookup(var.amis, var.region)}"
${var.amis["us-east-1"]} 



# Ficheros
Si queremos pasar el contenido de un fichero:
"${file(var.nombre)}"



# Iterpolation
https://www.terraform.io/docs/configuration/interpolation.html

Built-in functions: https://www.terraform.io/docs/configuration/interpolation.html#built-in-functions

${length("a,b,c")} = 5
