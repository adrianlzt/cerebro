Cada fichero .c se compila de forma aislada y luego se unen por el linker.

Podemos compilar un fichero .c de forma aislada que llame a otras funciones, declaradas pero no definidas, en ese fichero .c

Para que luego podamos generar un ejecutable, tendremos que linkar esos ficheros compilados que hacen uso de las funciones con los ficheros compilados que implementan esas funciones.
Ese es el trabajo del linker.

Si solo compilamos, típicamente el compilador generará fichero .obj, listos para ser linkados.
Estos ficheros harán uso de "symbols" que tendrán que ser resueltos por el linker para poder generar un ejecutable.
