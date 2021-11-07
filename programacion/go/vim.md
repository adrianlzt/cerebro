https://github.com/fatih/vim-go
https://github.com/fatih/vim-go/blob/master/doc/vim-go.txt

Plugins a utilizar:
deoplete.nvim
vim-go
deoplete-go

Si se vuelve loco a consumir memoria, puede ser porque no ha encontrado un parent y ha subido por el tree y está intentando indexar todo el GOPATH
hacer un touch go.mod en algún dir para que solo suba hasta ahí


Comandos:
:Go<TAB>


Instalar dependencias de go:
:GoInstallBinaries


:GoDef
gd
Ir a la definición de la interfaz, funcion, struct, etc
Control+t, volver a donde estábamos antes de este salto


:GoImpl
crear los stubs para implementar una interfaz

:GoImplements
nos dice que interfaces implementa ese elemento

:GoCallers
mirar quien llama a esta función
Tal vez el "scope" (donde busca las cosas) no está bien definido. Podemos ponerlo a mano
:GoGuruScope github.com/foo/bar
si el repo es grande puede ser demasiado costoso

:GoChannelPeers
ver senders/receivers de un canal


Desactivar metalinter al guardar
:let g:go_metalinter_autosave=0


# Struct
:GoFillStruct
    Use `fillstruct` to fill a struct literal with default values.

:GoKeyify
    Uses `keyify` to turn unkeyed struct literals into keyed ones.

,i go-info

,r go-run
,rr cerrar ventana de la derecha

,b go-build

,t go-test
,ti go-test en vertical

,doc go-doc en un split

,d ir a la definición

,e generar if err ...


# Errores
go: github.com/gogo/protobuf@v1.3.2: missing go.sum entry; to add it:\n\tgo mod download github.com/gogo/protobuf
Usando nvim 0.5.0 con gopls instalado localmente, me daba ese error.
Lo arreglé actualizando esa lib en $HOME/go/src/github.com/gogo/protobuf a esa versión
