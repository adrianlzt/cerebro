https://www.terraform.io/docs/language/data-sources/index.html

Use of data sources allows a Terraform configuration to make use of information defined outside of Terraform, or defined by another separate Terraform configuration.

Cada provider suele tener una sección de "Data sources" con lo que podemos obtener.


Ejemplo, creo que obtenemos de un bucket de GCS un template para un fichero
data "terraform_remote_state" "foo" {
  backend = "gcs"
  config = {
    bucket  = "terraform-state"
    prefix  = "prod"
  }
}

resource "template_file" "bar" {
  template = "${greeting}"

  vars {
    greeting = "${data.terraform_remote_state.foo.greeting}"
  }
}



Parece que también nos permite hacer queries a los objetos que existen actualmente para obtener cierto dato:
Find the latest available AMI that is tagged with Component = web

data "aws_ami" "web" {
  filter {
    name   = "state"
    values = ["available"]
  }

  filter {
    name   = "tag:Component"
    values = ["web"]
  }

  most_recent = true
}


Obtener el usuario actual:
data "google_client_config" "current" {
  provider = google-beta
}
