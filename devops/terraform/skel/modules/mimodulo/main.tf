resource "tipo_de_recurso" "nombre_recurso" {
  variable = "valor"
}

/*
* Un comentario
* con varias lineas
*/
resource "otro_tipo_de_recurso" "otro_recurso" {
  variable = "${tipo_de_recurso.nombre_recurso.id}"
}

# Comentario
module "nombre" {
  source = "./modules/mimodulo"
}
