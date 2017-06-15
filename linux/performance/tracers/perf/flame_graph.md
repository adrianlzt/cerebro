## Flame Graph ##
git clone https://github.com/brendangregg/FlameGraph
cd FlameGraph/
perf record -F 99 -a -g -- sleep 60
perf script | ./stackcollapse-perf.pl > out.perf-folded
  este comando hay que ejecutarlo donde se hace la captura, o una con el mismo kernel, ya que necesita simbolos
./flamegraph.pl out.perf-folded > perf-kernel.svg
geeqie flame.svg

En horizontal es el tiempo consumido.
Hacia arriba los stack trace. Cada llamada monta encima las llamadas que él hace.
