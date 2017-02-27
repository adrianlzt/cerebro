https://docs.python.org/3/library/functools.html#functools.lru_cache

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


Since a dictionary is used to cache results, the positional and keyword arguments to the function must be hashable.


