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
Si intentamos convertir un interface{} en un struct definido de la misma manera, también fallará: panic: interface conversion: interface {} is main.Persona, not main.Persona (types from different packages)

Podemos usar gob para codificar/decodificar el struct que necesitamos usar. Declarándolo las dos veces de la misma manera en el programa y el plugin. Ejemplo: https://gist.github.com/b86d45551fc55669a4a763d0705b3cad



El problema de las issues de github es que si usamos la misma libreria pero en paths distintos, tabmién fallará.
Problemas si usamos plugins y directorio vendor/
https://github.com/akutz/gpd
https://github.com/golang/go/issues/20481
https://github.com/golang/go/issues/27062
https://github.com/golang/go/issues/26759
https://github.com/golang/go/issues/18827


Relacionado, el plugin y el programa deben haberse compilado con la misma versión de las librerias.


# Hashicorp
https://github.com/hashicorp/go-plugin
Otra forma de "plugins" que inventó hashicorp antes de que existiese la lib "plugin" oficial.
Usa comunicación RPC

