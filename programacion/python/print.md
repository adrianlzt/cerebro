Con colores: https://pypi.python.org/pypi/termcolor
termcolor.md
colorama.md

Tabulado:
https://pypi.python.org/pypi/tabulate


print ("Cruze por critical: %s" % crit_fecha if crit_fecha else "Sin cruze por critical")


Si new line al final:
http://stackoverflow.com/questions/493386/how-to-print-in-python-without-newline-or-space

import sys
sys.stdout.write('.')

# Python 2
print('.'),

# Python 3
print('.', end="")
print('.',end="",flush=True)
   Or if you are having trouble with the buffer


# Imprimir en la misma parte de la pantalla / imprimir al comienzo de la linea
print("a", end='\r')
Esto imprime 'a' y deja el "seek" listo para imprimir al comienzo de la linea de nuevo

Si antes teniamos una cadena larga, solo sustituira el primer caracter


Muestra una barra dando vueltas

import time

print("-", end="\r")
time.sleep(.5)
print("\\", end="\r")
time.sleep(.5)
print("|", end="\r")
time.sleep(.5)
print("/", end="\r")
time.sleep(.5)
print("-", end="\r")



print(f"variable {valor}")
