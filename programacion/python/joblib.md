https://pythonhosted.org/joblib/
https://chryswoods.com/parallel_python/


# caching
https://pythonhosted.org/joblib/memory.html
http://queirozf.com/entries/caching-function-results-in-python-examples-joblib-and-functools

The caching functionality allows you to easily ‘memoize’ functions with a simple decorator. This caches the results, and loads them from the cache when calling the function again using the same parameters – saving a lot of time.

Nos permite almacenar el resultado de una función costosa, así en la próxima ejecucción no tendrá que procesarla.
Pensado principalmente para calculos muy grandes, por ejemplo tareas con numpy

Esto almacena en disco. lru_cache en memoria.
Lo bueno de este sistema es que podemos compartir resultados entre distintos workers de joblib (lru_cache no parece funcionar con joblib)

>>> from joblib import Memory
>>> mem = Memory(cachedir='/tmp/')
# creará el dir /tmp/joblib
>>> import numpy as np
>>> a = np.vander(np.arange(3)).astype(np.float)
>>> square = mem.cache(np.square)
>>> b = square(a)
>>> c = square(a)
Esta última llamada tirará de la cache en vez de realizar la computacion

>>> @memory.cache
... def f(x):
...     print('Running f(%s)' % x)
...     return x
>>> print(f(1))
Running f(1)
1
>>> print(f(1))
1

# parallelisation
https://joblib.readthedocs.io/en/latest/generated/joblib.Parallel.html

Mirar paralelizacion_joblib.py
Para python3 mirar threading_python3.py

Si queremos ver trazas de la ejecucción:
from time import sleep
from joblib import Parallel, delayed
def f(i):
    sleep(1)

Parallel(n_jobs=2, verbose=5)(delayed(f)(i) for i in [1,2,3,4])

Cuanto más alto el número de verbose, más debug.

Bug haciendo logging, workaround:
https://github.com/joblib/joblib/issues/634#issuecomment-367321025


## Distibuir carga en varios sistemas
Podemos hacerlo con el backend "ray"



# Logging/tracing
The different functionalities will progressively acquire better logging mechanism to help track what has been ran, and capture I/O easily. In addition, Joblib will provide a few I/O primitives, to easily define logging and display streams, and provide a way of compiling a report. We want to be able to quickly inspect what has been run.


# persistence (saving/loading data)
Fast compressed Persistence: a replacement for pickle to work efficiently on Python objects containing large data ( joblib.dump & joblib.load ).


