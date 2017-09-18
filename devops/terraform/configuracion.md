https://www.terraform.io/docs/configuration/syntax.html

variables.md
providers.md
resources.md
output.md

Ficheros terminados en .tf

neo/vim extension: https://github.com/hashivim/vim-terraform

Las configuraciones tambien pueden ser ficheros JSON, pero estos son menos legibles y no permiten comentarios.


# An AMI
variable "ami" {
  description = "the AMI to use"
}

/* A multi
   line comment. */
resource "aws_instance" "web" {
  ami               = "${var.ami}"
  count             = 2
  source_dest_check = false

  connection {
    user = "root"
  }
}


# Maps
variable "ami" {
  description = "the AMI to use"
}

Equivalente a:
variable = [{
  "ami": {
    "description": "the AMI to use",
  }
}]
