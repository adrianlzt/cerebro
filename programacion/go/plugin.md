https://golang.org/pkg/plugin/
Podemos compilar ciertos programas como plugins y luego cargarlo desde terceros programas

https://medium.com/learning-the-go-programming-language/writing-modular-go-programs-with-plugins-ec46381ee1a9
https://github.com/vladimirvivien/go-plugin-example
Tenedremos que compilar los directorios con:
go build --buildmode=plugin

Los plugins deberán ser "package main", pero sin definir un main()


Los plugins funcionan como una especie de closure.
Las variables que definamos en el plugin serán visibles por todas las funciones del plugin.
Se podrán modificar y el resto de funciones verán esas modificaciones.


Si tenemos que pasar tipos de datos entre el plugin y el programa, esa definición tiene que estar en un sitio compartido, que tiene que ser el mismo.
Por ejemplo, si definimos en el main y en el plugin el mismo struct, fallará, porque interpretará que es distinto.

El problema de las issues de github es que si usamos la misma libreria pero en paths distintos, tabmién fallará.
Problemas si usamos plugins y directorio vendor/
https://github.com/akutz/gpd
https://github.com/golang/go/issues/20481
https://github.com/golang/go/issues/27062
https://github.com/golang/go/issues/26759
https://github.com/golang/go/issues/18827



# Hashicorp
https://github.com/hashicorp/go-plugin
Otra forma de "plugins" que inventó hashicorp antes de que existiese la lib "plugin" oficial.
Usa comunicación RPC

