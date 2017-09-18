Son los distintos elementos que podemos desplegar sobre un provider.
Al final de la web de cada resource (dentro de cada provider) tenemos todas las opciones disponibles son su descripción.

Por ejemplo, una VM sobre AWS.
Un nuevo host en Icinga2
Una nueva database en InfluxDB

Sintaxis:

resource "tipo_de_resource" "nuestro_nombre_para_el_resource" {
  param1 = "value1"
  param2 = ["v1", "v2"]

  otherthing {
    this = "that"
  }
}
