## Flame Graph
git clone https://github.com/brendangregg/FlameGraph
cd FlameGraph/
perf record -F 99 -a -g -- sleep 60
perf script | ./stackcollapse-perf.pl > out.perf-folded
  este comando hay que ejecutarlo donde se hace la captura, o una con el mismo kernel, ya que necesita simbolos
./flamegraph.pl out.perf-folded > perf-kernel.svg
geeqie flame.svg

En horizontal es el tiempo consumido.
Hacia arriba los stack trace. Cada llamada monta encima las llamadas que él hace.



## Flame graphs CPI
http://www.brendangregg.com/blog/2014-10-31/cpi-flame-graphs.html

Flame graphs para cyclops-per-instruction.
Los colores nos indican las funciones con mayor CPI (usan muchos ciclos por cada instrucción, malo) y las que tiene un CPI bajo en rojo.

En la web se dice como capturarlo para FreeBSD
This approach is also possible on Linux, provided you have PMC access, which my current cloud instances don't!

En un charla de 2016 tambien lo muestra https://www.slideshare.net/brendangregg/linux-bpf-superpowers pero no me queda claro si era para linux.



## Off cpu flame graph
http://www.brendangregg.com/blog/2016-02-01/linux-wakeup-offwake-profiling.html
