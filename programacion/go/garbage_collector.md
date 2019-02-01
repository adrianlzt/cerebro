Ejemplo de uso de SetFinalizer. Función que se llama cuando el GC (garbage collector) quiere limpiar una variable.
https://play.golang.org/p/jWhRSPNvxJ

Un resumen básico de como funciona el GC.
Cada variable de un paquete o de las funciones locales actualmente en uso pueden ser el comienzo de un camino hacia la variable que queremos limpiar.
Si no existe dicho camino, quiere decir que podemos limpiar la variable.
