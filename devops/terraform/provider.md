https://www.terraform.io/docs/providers/index.html
Son la base donde crearemos nuestros resources.

Ejemplos: AWS, Icinga2, InfluxDB


Actualizar los providers
terraform init -upgrade


# Third party providers
https://www.terraform.io/docs/language/providers/configuration.html#third-party-plugins


# Local providers
Podemos bajar el fichero binario del provider y dejarlo en local para no tener que descargarlo.

https://stackoverflow.com/a/68184799

Podemos usar un "terraform init" normal para conseguir descargar los binarios en ./.terraform y luego moverlos al directorio ~/.terraform.d/plugins/terraform.local/local


terraform {
    required_providers {
        google = {
            source = "terraform.local/local/google"
            version = "= 4.61.0"
        }
    }
}

También hace falta crear el fichero .terraformrc:
provider_installation {
  filesystem_mirror {
    path    = "/home/user/.terraform.d/plugins"
  }
  direct {
    exclude = ["terraform.local/*/*"]
  }
}
