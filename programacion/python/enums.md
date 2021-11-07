https://docs.python.org/3/library/enum.html

from enum import Enum
class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

Color.GREEN

Si queremos usar el valor: Color.GREEN.value


Valores automáticos:
class Color(Enum):
    RED = auto()
    BLUE = auto()
    GREEN = auto(
