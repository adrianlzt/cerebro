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

# Maps
https://www.terraform.io/intro/getting-started/variables.html#maps
