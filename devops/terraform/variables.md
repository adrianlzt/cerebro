https://www.terraform.io/intro/getting-started/variables.html

Generalmente usadas para esconder keys de los ficheros de configuración y para cuando usamos un valor en repetidas ocasiones

Definición de una variable sin valor (se nos preguntará, o tendremos que pasarla como parametro)
variable "aws_access_key" {}

La usaremos como:
"${var.aws_access_key}"


Si no definimos la variable nos la preguntará por stdout.

La podemos pasar como parametro:
terraform apply -var "ost_pass=1234"

O con un fichero:
terraform.tfvars *.auto.tfvars (estos se cogerán automáticamente)

En un fichero definiremos las variables como (tendrán que estar definidas en algun sitio: variable nombrevariable {}):
nombrevariable = "valor"



Si queremo forzar a coger un fichero:
-var-file="fichero"

Variables de entorno (solo strings):
TF_VAR_nombre


# Default
variable "aws_access_key" {
  default = "valor_si_no_se_define"
}

# Lists
https://www.terraform.io/intro/getting-started/variables.html#lists

variable "cidrs" { default = [] }

# explicitly
variable "cidrs" { type = "list" }
You can specify lists in a terraform.tfvars file:

cidrs = [ "10.0.0.0/16", "10.1.0.0/16" ]



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



# Ficheros
Si queremos pasar el contenido de un fichero:
"${file(var.nombre)}"
