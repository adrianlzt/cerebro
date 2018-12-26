http://mypy-lang.org/

Tipado estatico en python
No se fuerza nada por parte de python, solo se define como marcar el tipado por si luego usamos herramientas externa que comprueben el que el tipado es correcto.

Ejecutaremos mypy sobre un .py para chequear que está correctamente tipado.

Para definir el tipado, a partir de python 3.7, usaremos el pep: https://www.python.org/dev/peps/pep-0526/

Definición para funciones y usando https://www.python.org/dev/peps/pep-0484/


from typing import List,Dict,ClassVar

primes: List[int] = []

captain: str  # Note: no initial value!

class Starship:
    stats: ClassVar[Dict[str, int]] = {}

def greeting(name: str) -> str:
    return 'Hello ' + name
