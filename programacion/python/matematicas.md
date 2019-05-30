mirar collections.md para ciertos trabajos con arrays


NumPy
SciPy

Si queremos hacer divisiones con números dobles:
800.0/1200

si no ponemos el .0 usará números enteros

O podemos usar float(v1)/v2

Resto de una división:
7%2 = 1

Prediccion de valores en timeseries:
forecast.md

statsmodel.md

# Conversiones
import locale
locale.atof("2.2")
locale.atoi("2")

Comprobar si una string es digito:
"2".isdigit()


CUIDADO con el locale a español.
>>> atof("2,2")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/usr/lib/python2.7/locale.py", line 316, in atof
    return func(string)
ValueError: invalid literal for float(): 2,2

def str_to_float(value):
  try:
    return atof(value)
  except ValueError as e:
    return str_to_float(value.replace(',','.'))



# NaN
Checks if the float x is a NaN (not a number). NaNs are part of the IEEE 754 standards. Operation like but not limited to inf * 0, inf / inf or any operation involving a NaN, e.g. nan * 1, return a NaN.

import math
math.isnan(x)

a = float("NaN")



# Ceil, siguiente numero entero
from math import ceil
ceil(3.2) # Da 4.0
