https://github.com/plasma-umass/scalene
A high-performance, high-precision CPU, GPU, and memory profiler for Python with AI-powered optimization proposals
https://aur.archlinux.org/packages/python-scalene-git/


# py-spy
https://github.com/benfred/py-spy
Analizar que funciones están consumiendo más tiempo.
Tiene un modo "top" y un generador de flame graph.
Puede conectarse a una app en ejecución.
No da info de memoria.

py-spy record -o flame.png -- python foo.bar -x -y

Para analizar un contenedor he tenido que usar nsenter:
nsenter -t 2960076 -a py-spy record -o profile.svg --pid 1

Muy útil la vision tipo "top", que nos dice que se está ejecutando en ese momento.



https://docs.python.org/3/library/debug.html
Tambien en py2. Viene por defecto.
python -m cProfile -o PROFILE apli_ucmdb.py --mis-params
  genera un fichero PROFILE

Para leer ese fichero podemos usar:
pip install CProfileV
cprofilev -f PROFILE
http://127.0.0.1:4000



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
Puede hacer flame graphs de python en ejecucción.
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



Ejemplo de como hacer profiling de una app de streamlit
https://blog.streamlit.io/3-steps-to-fix-app-memory-leaks/



https://functiontrace.com/#installation
Este tiene buena pinta, pero no consigo que me genere ninguna info con una app simple.



# guppy
https://github.com/zhuyifei1999/guppy3
https://www.pluralsight.com/blog/tutorials/how-to-profile-memory-usage-in-python

Nos da info de en que cosas se está gastando memoria.

pip install guppy3

from guppy import hpy
h = hpy()
print(h.heap())



# memory-profiler
https://pypi.org/project/memory-profiler/

Sopora varias cosas, entre ellas, un decorador para ver como consumimos memoria línea a línea en una función.
