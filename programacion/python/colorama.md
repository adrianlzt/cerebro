https://pypi.python.org/pypi/colorama

Su función es la de mostrar el texto con diferentes fondos y colores de una forma muy sencilla y sin quebraderos de cabeza. Muy recomendada si queréis hacer un script que sea visualmente atractivo.

from colorama import Fore, Back, Style
print(Fore.RED + 'some red text'+Style.RESET_ALL)
