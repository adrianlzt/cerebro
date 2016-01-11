# Rangos
https://docs.scipy.org/doc/numpy/reference/routines.array-creation.html#numerical-ranges

>>> np.arange(5)
array([0, 1, 2, 3, 4])

>>> np.arange(3,7)
array([3, 4, 5, 6])

>>> np.arange(2,10,2)
array([2, 4, 6, 8])

>>> np.linspace(1,6)
nos devuelve 50 numeros entre el 1 y el 6 (incluidos)

>>> np.linspace(1,2,5)
array([ 1.  ,  1.25,  1.5 ,  1.75,  2.  ])




# Generar matriz/array de unos
https://docs.scipy.org/doc/numpy/reference/generated/numpy.matlib.ones.html

import numpy as np
import numpy.matlib as matli
np.float32(matlib.ones(2))
matrix([[ 1.,  1.]], dtype=float32)
