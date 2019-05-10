https://github.com/golang/go/wiki/Modules
https://github.com/golang/go/wiki/vgo
https://talks.bjk.fyi/gcru18-vgo.html#/
https://github.com/golang/go/wiki/vgo-user-guide

Herramientas que no funcionan aún con los modules:
https://github.com/golang/go/issues/24661

vgo fue el nombre del prototipo que se le dió a modules

Modules nos permite tener en un directorio, fuera de GOPATH, nuestro código junto con los packages que necesitamos para funcionar.

El concepto de module es distinto al de package (unidad atómica que usamos) y al de repositorio (puede contener varios packages).

En el mundo go el acuerdo es usar semver con vA.B.C (vA.B.C-rc1)

La v0.x.y se considera una versión donde no hay que respectar romper la API cuando cambiemos x o y.

v1 será la primera versión donde dejaremos una api estandar que no vamos a romper.

En el caso de tener que romper la API, crearemos un nuevo path /vN. De esta manera no romperemos la compatibilidad con la gente que use v1.
v1 no llevará el sufijo "v1", tampoco la v0.
github.com/my/mod -> github.com/my/mod/v2
github.com/my/mod/mypkg -> github.com/my/mod/v2/mypkg

go mod siempre eligirá la versión mínima necesaria de cada módulo (en el caso de que otros terceros módulos requieran la misma)
https://github.com/golang/go/wiki/Modules#version-selection
Esto se hace para evitar fallos por upgrades automáticos que puedan romper cosas.


# Uso
cd mi/path

go mod init github.com/user/example
  como no estamos en GOPATH/, tenemos que decirle como se llama nuestro módulo.
  esto nos crea el fichero go.mod, donde tendremos el nombre de nuestro módulo y los requisitos que vayamos teniendo (estilo requirements.txt de python)

go build / go run
  esto actualizará el fichero go.mod con la versiones de las deps usadas
  bajará las dependencias que necesitemos. Las méterá en $GOPATH/pkg/mod/github.com/mattn/go-isatty@v0.0.4

  en go.sum tendremos el checksum del package descargado, por si alguien hiciese un push force a la tag que estamos usando y realmente el código fuese distnto

  Ambos ficheros, go.mod y go.sum deberán ser comiteados para asegurarnos un build repetible por nuestros usuarios.

  Nomenclatura go.mod
    Si vemos en la versión de un paquete "+incompatible", es que el módulo usa vN (N>1) pero no está siguiendo el Semantic Import Versioning (paquete/v2/blabl)
    indirect: 


La importación (go imports) automática de imports no funcionará si no tenemos el paquete cargado en nuestro module.



Ver quien usa una determina dependencia:
go mod why -m github.com/mattn/go-isatty
  -m es para decir que búsque usos de los módulos que estan en ese repo


Si queremos cambiar la versión que usamos de un repo, modificamos el go.mod y hacemos run/build
O tambien podemos hacer: go get lib@version
go.sum se acordará de las versiones de paquetes que hayamos visto, aunque ya no lo estamos usando. Útil por si queremos volver a una versión que queremos.

Con "go mod tidy" podemos limpiar dependencias no usadas de go.mod
Si por ejemplo hemos hecho algún "go get ..." para hacer unas pruebas y ya no lo necesitamos.
tidy también se bajará las librerias de las que dependenmos para los tests


Si queremos actualizar una dependencia:
go get -u nombre/repo


Dependencias que vamos a usar
go get -m all



# Replace / gohack
https://github.com/rogpeppe/gohack
https://github.com/golang/go/wiki/Modules#when-should-i-use-the-replace-directive

Podemos reemplazar un modulo determinado que estamos usando por otro path donde tengamos una copia a la que realizamos cambios
La cli "gohack" nos ayuda con esto.

gohack get github.com/a/b
  se bajará esa lib en $HOME/gohack y nos pondrá un "replace" en go.mod para que usemos ese path en vez de el "bueno".


# Sacar una nueva versión major
https://github.com/golang/go/wiki/Modules#releasing-modules-v2-or-higher

Podemos cambiar el nombre de nuestro módulo (en go.mod) para ponerle el "v2" al final.
O podemos crear un nuevo directorio con su propio go.mod
