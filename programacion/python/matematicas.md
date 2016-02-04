NumPy
SciPy

Si queremos hacer divisiones con números dobles:
800.0/1200

si no ponemos el .0 usará números enteros

Prediccion de valores en timeseries:
forecast.md

statsmodel.md


# NaN
Checks if the float x is a NaN (not a number). NaNs are part of the IEEE 754 standards. Operation like but not limited to inf * 0, inf / inf or any operation involving a NaN, e.g. nan * 1, return a NaN.

import math
math.isnan(x)

a = float("NaN")
