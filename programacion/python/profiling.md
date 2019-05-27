https://docs.python.org/3/library/debug.html
Tambien en py2. Viene por defecto.
python -m cProfile -o PROFILE apli_ucmdb.py --mis-params

Para generar un mapa:
  pip install gprof2dot
  python -m profile -o output.pstats path/to/your/script arg1 arg2
  gprof2dot -f pstats output.pstats | dot -Tpng -o output.png

https://stackoverflow.com/a/10592072
profile de memoria, module memory_profiler


python -m cProfile -s cumtime apli_ucmdb.py --mis-params > PROFILE


ncalls
  for the number of calls.
tottime
  for the total time spent in the given function (and excluding time made in calls to sub-functions)
percall
  is the quotient of tottime divided by ncalls
cumtime
  is the cumulative time spent in this and all subfunctions (from invocation till exit). This figure is accurate even for recursive functions.
percall
  is the quotient of cumtime divided by primitive calls
filename:lineno(function)
  provides the respective data of each function



It's useful to launch our app under profiling and save the results when it finishes or it's interrupted.
It relies on greenlet profiler (http://emptysqua.re/blog/greenletprofiler/) which also has a built in Yappi (https://code.google.com/p/yappi/) fixing some issues this last one had dealing with greenlets. 
The main advantage of these profilers over cProfile or hotshot (which is also deprecated) is that they can trace multithreaded programs and support using cpu time instead of wall clock time. Moreover, the callgrind output format is supported, so we can use fancy graphical tools such as kcachegrind (http://kcachegrind.sourceforge.net/html/Home.html) to analyze the results.

Mirar gprofile.py


pyflame de uber
Puede hacer flame graphs de python en ejecucción
mirar pyflame.md



mirar quickstack.md para capturar stack frames de un programa en ejecución


https://github.com/nvdv/vprof
Nos hace flame graphs
Dice como gasta la memoria.
Analiza que parte del código se usa más

pip install vprof
vprof -c cmh "apli_ucmdb.py -x -m" -o analisis.prof

-o, guarda el profiling en un fichero

Ejecuta los cuatro análsis (lanza 4 veces la aplicación):
 c - CPU flame graph
 m - memory graph
 h - code heatmap, nos muestra todo el codigo, marcando con colores intensos las líneas que se llevan más tiempo. Nos dice por cada linea el número de ejecucciones y el porcentaje del tiempo total

Nos abre un navegador web para mostrar los resultados
http://127.0.0.1:8000/
