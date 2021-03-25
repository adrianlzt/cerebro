q<Donde guardar>

Ejemplo: qw

Si queremos hacer un append a la macro 'w':
qW

Ahora ejecutamos las operaciones que quramos, tanto de comandos como de insercción.
Al terminar pulsamos de nuevo a 'q'.

Para ejecutar la macro: @w

También:
:normal @w

Para ejecutar en todas las líneas:
:%normal @w

Más fácil, seleccionar líneas con Shift+v (selección vísual de líneas) y despues :normal @q

Repetir última macro
@@
