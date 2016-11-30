https://pypi.python.org/pypi/termcolor

from termcolor import colored, cprint

text = colored('Hello, World!', 'red', attrs=['reverse', 'blink'])


El segundo argumento es el color del texto.
grey
red
green
yellow
blue
magenta
cyan
white

Luego se puede poner un fondo:
on_grey
on_red
on_green
on_yellow
on_blue
on_magenta
on_cyan
on_white

Y por ultimo los atributos:
bold
dark
underline
blink
reverse
concealed
