https://docs.python.org/3/library/enum.html

from enum import Enum
class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

Color.GREEN

Si queremos usar el valor: Color.GREEN.value


Valores automáticos (empiezan en 1):
from enum import Enum, auto
class Color(Enum):
    RED = auto()
    BLUE = auto()
    GREEN = auto()


También podemos hacer:
Color["RED"]

Saltará excepción KeyError si no existe.
