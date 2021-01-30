https://www.terraform.io/docs/language/meta-arguments/lifecycle.html

resource "azurerm_resource_group" "example" {
  # ...

  lifecycle {
    create_before_destroy = true
  }
}

create_before_destroy parámetro para que al modificar un recurso que no se puede actualizar, primero se cree el nuevo y luego se borre el antiguo.
No funciona con todos los recursos.
