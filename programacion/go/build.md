# Tener un build.go que gestione todo los pasos
Ejemplo: https://github.com/grafana/grafana/blob/master/build.go



# go build
go build programa.go
  nos genera un binario programa


En ciertos casos no genera un binario estático. Creo que es cuando parte del código está linkado a c
Mirar static.md


Debug de que está haciendo:
-x

Dry-run
-n

Más verboso:
-v

Mostrar y no borrar el directorio de trabajo:
-work

Ignorar las caches (que aceleran los builds)
-a

Desactivar optimizaciones:
go build -gcflags="-N -l"



# Build
https://github.com/golang/go/blob/master/src/cmd/compile/README.md

go files -> AST -> SSA -> .a files -> linker -> binary

Todo el build se genera en un tempdir.
Podemos mantener el contenido de ese dir y su path con:
go build -a -work


Mirar que ficheros se van a usar para la compilación (por ejemplo no veríamos que mete ficheros específicos de otras plataforma para las que no estamos compilando, los típicos xxx_windows.go):
go list -f {{.GoFiles}}

En la doc golang.org/pkg/cmd/go/internals/list tenemos toda la info que podemos sacar.
También podemos ver la ayuda con:
go help list


Podemos ver el código go assembly con (veremos al comienzo nuestro código):
go build -gcflags="-S" | less

Si queremos ver el código ensamblador generado
go tool objdump -s main.main BINARIO

Obtener los símbolos (filtramos para obtener solo los de main):
go tool nm BINARIO | grep main.main

Código intermedio (SSA compiler https://github.com/golang/go/tree/master/src/cmd/compile/internal/ssa)
GOSSAFUNC=main go build
 creo que falta algo
GOSSAFUNC=main sudo -E go build -v
  bug? sin sudo parece que no funciona


Optimizaciones
go build -gcflags="-m"

Algo garbage collector
go build -gcflags="-live"


trace profile

memory profile

race detectors
