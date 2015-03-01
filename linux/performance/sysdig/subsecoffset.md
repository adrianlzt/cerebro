https://github.com/draios/sysdig/pull/309

Nos sirve para ver la periodicidad de eventos.
Lo que nos enseña es una línea contínua donde va poniendo cuando se producen los eventos.
Si la pantalla fuese infinítamente larga, veríamos como pintaría en esa línea los eventos según cuando se hayan producido.

sysdig -c subsecoffset [resolucion]
  la resolución es el tamaño de linea que nos muetra antes de cortar y saltar a la siguiente linea.
  por defecto es de 1s
  si ponemos, 100, serán 100ms

Por ejemplo, un evento que se produce cada 100ms, con la resolución por defecto veremos que aparece 10 veces en cada linea impresa por este chisel.
Si un evento se produce cada 2s, veremos que aparece una marca en una línea, nada en la siguiente, y vuelve a aparecer la marca en la misma posició en la tercera línea.

Ejemplo:
En una ventana: $ top -d 1
En otra: $ sysdig -c subsecoffset proc.name=top
