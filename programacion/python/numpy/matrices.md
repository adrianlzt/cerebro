import numpy as np

Vector:
np.array([1,2,3])

Matriz:
np.array([[1,2,3],[4,5,6]])

Dimensiones, nos devuelve una tupla (filas,columnas):
A.shape

X[0:3,:]
  coger las tres primeras filas

X[X[:,2]<25,:]
  filtrar en la matriz, solo quedarnos con las filas cuya tercera columna (el índice empieza en 0) sea menor de 25
  mirar filtrar.md

Operaciones:
A+B
A.dot(B)

CUIDADO con el símbolo "*":
A*B multiplica el valor de cada posición por el valor de la otra matriz en la misma posición.
La "típica" multiplicación de matrices es A.dot(B)


Matriz transpuesta:
A.T

Matriz inversa (pinv es la pseudo-inversa, que siempre va a encontrar la matriz inversa, aunque no exista una exacta; si queremos la inversa usaremos linalg.inv)
np.linalg.pinv(A)

Matriz identidad (ejemplo 4x4):
np.identity(4)
