# Naming
https://blog.golang.org/package-names

Cortos.
No usar "_" ni camelCase


# Gestión paquetes
Usar vgo.md


Para buscar paquetes:
http://go-search.org/


go dep github.com/nombre/paquete


Si queremos fijar las dependencias se solia hacer copiandolas en el directorio vendor/
Si una dependencia estaba en vendor/ se usaba antes de la que estuviese en GOPATH


# Tener un dominio custom para almacenar paquetes
https://gopherpit.com/

import "project.example.com/package"



# Gestores dependencias
https://blog.gopheracademy.com/advent-2016/saga-go-dependency-management/

Mirar:
dep.md (Gopkg.toml)
govendor.md
glock.md
gdm.md
vndr.md
glide.md
