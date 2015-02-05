http://docs.mongodb.org/manual/tutorial/enable-authentication/

Los usuarios se crean en la database admin, colección: system.users
use admin
db.system.users.find()


Crear usuario root:
use admin
db.createUser(
    {
      user: "superuser",
      pwd: "12345678",
      roles: [ "root" ]
    }
)

Creamos un administrador de usuarios:
use admin
db.createUser(
  {
    user: "admin",
    pwd: "password",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)

userAdminAnyDatabase y userAdmin dan al usuario los permisos de ejecutar createUser() y grantRole() (asignar roles)

A partir de este momento ya no podremos acceder desde localhost sin credenciales (localhost exception: http://docs.mongodb.org/manual/core/authentication/#localhost-exception)

Tendremos que conectar a la database admin:
mongo admin -u admin -p password


Ahora creamos el usuario reportsUser en la database reporting con acceso read a reporting, products y sales; y acceso de lectura/escritura en accounts

use reporting
db.createUser(
    {
      user: "reportsUser",
      pwd: "12345678",
      roles: [
         { role: "read", db: "reporting" },
         { role: "read", db: "products" },
         { role: "read", db: "sales" },
         { role: "readWrite", db: "accounts" }
      ]
    }
)

Este usuario podrá conectar como:
mongo reporting --host=HOST -u reportsUser -p 12345678


use test
db.createUser(
    {
      user: "jose",
      pwd: "123",
      roles: [
        { role: "readWrite", db: "pepe" }
      ]
    }
)

Se conecta como:
mongo test --host=HOST -u jose -p 123
Conectará a la db test, pero ahí no puede hacer inserciones, por lo que habrá que cambiar a pepe:
> use pepe
> db.prueba.insert({"asd":123})



# Roles
read, readWrite, dbAdmin, userAdmin, clusterAdmin, readAnyDatabase, readWriteAnyDatabase, userAdminAnyDatabase, dbAdminAnyDatabase

# Restaurar
Si queremos desactivar la autentificacion: restaurar_permisos.md

