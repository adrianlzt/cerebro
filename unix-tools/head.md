# Mantener el header de un comando
ps -ef | { sed -u 1q; grep foo; }

https://stackoverflow.com/a/8624829/1407722

Esta solución NO ES VÁLIDA:
ps -ef | (head -1; grep foo)

"head" consume muchas líneas, no dejando el resto del output a grep
Usar "( )" crea una subshell, con "{ }" lo evitamos.

seq 1 5 | { head -1; head -1; }
  aquí podemos ver como solo saldrá un "1", el segundo head no tiene lineas que consumir

seq 1 5 | { sed -u q1; head -1; }
  en este caso si veremos la salida correcta "1\n2", por que sed solo consumirá una línea
