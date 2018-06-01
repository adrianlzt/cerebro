https://docs.python.org/3/library/functools.html#functools.lru_cache
LRU: Least-recently-used
LFU: Least-frequenty-used

Cachea respuestas a una funcion comun:

from functools import lru_cache
@lru_cache(maxsize=32)
def get_pep(num):
    'Retrieve text of a Python Enhancement Proposal'
    resource = 'http://www.python.org/dev/peps/pep-%04d/' % num
    try:
        with urllib.request.urlopen(resource) as s:
            return s.read()
    except urllib.error.HTTPError:
        return 'Not Found'

Si llamamos dos veces a get_pep(num), la segunda usará la cache automáticamente.


No funciona si los parametros son un array.
No usar si hacemos yield desde dentro de la función (ya que no se hará el yield al cachear)
Si hay un raise dentro de la funión tampoco funciona.


Since a dictionary is used to cache results, the positional and keyword arguments to the function must be hashable.


Podemos llamar a:
funcionCacheada.cache_info() para obtener info de como ha ido el cacheo. Ejemplo:
>>> fib.cache_info()
CacheInfo(hits=28, misses=16, maxsize=None, currsize=16)

También podemos limpiar la cache con:
funcionCacheada.cache_clear()



# Invalidar cache con el tiempo
https://gist.githubusercontent.com/Morreski/c1d08a3afa4040815eafd3891e16b945/raw/6c9b6d958247de9b0170a398acb525e5f346cd2d/timed_cache.py

Mirar si queremos definir un maxsize al lru_cache

from datetime import timedelta,datetime
import functools

def timed_cache(**timedelta_kwargs):
    def _wrapper(f):
        update_delta = timedelta(**timedelta_kwargs)
        next_update = datetime.utcnow() - update_delta
        # Apply @lru_cache to f with no cache size limit
        f = functools.lru_cache(None)(f)

        @functools.wraps(f)
        def _wrapped(*args, **kwargs):
            nonlocal next_update
            now = datetime.utcnow()
            if now >= next_update:
                f.cache_clear()
                next_update = now + update_delta
            return f(*args, **kwargs)
        return _wrapped
    return _wrapper


Ejemplo de uso, invalidando el cache cada 10":
@timed_cache(seconds=10)
def slow():
    time.sleep(5)
    return datetime.now()

while True:
    print("run slow()")
    print(slow())
    print("wait for next iteracion 1s")
    time.sleep(1)



# lru_cache limitado por la memoria máxima disponible
https://stackoverflow.com/questions/23477284/memory-aware-lru-caching-in-python
https://gist.github.com/wmayner/0245b7d9c329e498d42b


# cachetools
Libreria que decide que elementos descartar segun un algoritmo
https://pypi.python.org/pypi/cachetools

Ejemplo donde almacenmos la cache en un fichero para poder restaurarla en la siguiente ejecucción:
from cachetools import cached
import pickle
import os

micache = {}
if os.path.isfile("dump.bin"):
    with open('dump.bin', 'rb') as f:
      micache = pickle.load(f)

@cached(cache=micache)
def fib(n):
    print("no cacheada")
    return n if n < 2 else fib(n - 1) + fib(n - 2)

for i in range(10):
    print('fib(%d) = %d' % (i, fib(i)))

with open('dump.bin', 'wb') as f:
  pickle.dump(micache,f)
