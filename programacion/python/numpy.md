http://www.numpy.org/

NumPy is the fundamental package for scientific computing with Python. It contains among other things:
  a powerful N-dimensional array object
  sophisticated (broadcasting) functions
  tools for integrating C/C++ and Fortran code
  useful linear algebra, Fourier transform, and random number capabilities

Besides its obvious scientific uses, NumPy can also be used as an efficient multi-dimensional container of generic data. Arbitrary data-types can be defined. This allows NumPy to seamlessly and speedily integrate with a wide variety of databases.


# numpy array a python lista/array
import numpy as np
>>> np.array([[1,2,3],[4,5,6]]).tolist()
[[1, 2, 3], [4, 5, 6]]

# Buscar un elemento en el array
>>> z=np.array([2,3,4,1,4,5,6,1])
>>> np.where(z==1)
(array([3, 7]),)
>>> np.where(z==1)[0]
array([3, 7])

# Añadir un elemento a un array
http://docs.scipy.org/doc/numpy/reference/generated/numpy.append.html
Nos devuelve un nuevo array, no lo mete en la variable que le pasamos
np.append(array,3)
np.append(array,[3,3,4])

Para añadir valores:
array = np.append(array,3)

# Generar arrays de datos
Con start, stop:
http://docs.scipy.org/doc/numpy/reference/generated/numpy.linspace.html

Por numero de muestras:
http://docs.scipy.org/doc/numpy/reference/generated/numpy.arange.html#numpy.arange

Por start, step y num de muestras
numpy.arange(start,start+step*n_elements,step)


