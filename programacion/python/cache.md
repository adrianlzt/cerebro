https://docs.python.org/3/library/functools.html#functools.lru_cache

Cachea respuestas a una funcion comun:

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

