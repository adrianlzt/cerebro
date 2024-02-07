https://www.terraform.io/docs/language/meta-arguments/lifecycle.html

resource "azurerm_resource_group" "example" {
  # ...

  lifecycle {
    create_before_destroy = true
  }
}

create_before_destroy parámetro para que al modificar un recurso que no se puede actualizar, primero se cree el nuevo y luego se borre el antiguo.
No funciona con todos los recursos.


Ignorar cambios en ciertos parámetros a la hora de decidir si debe modificarse.
resource "aws_instance" "example" {
  # ...

  lifecycle {
    ignore_changes = [
      # Ignore changes to tags, e.g. because a management agent
      # updates these based on some ruleset managed elsewhere.
      tags,
    ]
  }
}
