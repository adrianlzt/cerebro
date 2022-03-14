import numpy as np

Vector:
np.array([1,2,3])

Matriz:
np.array([[1,2,3],[4,5,6]])

Dimensiones, nos devuelve una tupla (filas,columnas):
A.shape

Número total de elementos (si es 2D, filas x columnas)
A.size

X[0:3,:]
  coger las tres primeras filas

X[[0,2],:]
X[[True,False,True],:]
  coger la fila primera y tercera



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

Matriz de ceros
np.zeros((2,3))

Matriz vacía donde definimos el número de columnas y el tipo de dato:
np.empty((0, 4), int)

Hacer append de rows a esa matriz vacía (no modifica, retorna la matriz modificada):
np.append(empty_array, np.array([[11, 21, 31, 41]]), axis=0)


Flatten / aplanar
a = np.array([[1,2], [3,4]])
a.flatten()
> array([1, 2, 3, 4])


Insertar un row en una matriz (añade más elementos a la matriz)
np.insert(a, 2, [50, 60, 70], axis=0)
  inserta ese vector en la tercera posición (2) como fila

np.insert(a, 1, [55, 66], axis=1)
  inserta ese vector en la segunda posición como vector columna


Sumar columnas (m,n) -> (n,1) (nos da un escalar por cada columna)
A.sum(axis=0)

Sumar filas (m,n) -> (m,1) (nos da un escalar por cada fila)
A.sum(axis=1)



Cambiar filas por columnas o viceversa.
Ejemplo cambiando una matriz (1,4) por (4,1)
np.array([1,2,3,4]).reshape(4,1)


# Broadcasting

Esto lo hace es convertir el escalar en una matriz del mismo tamaño que el primer elemento y sumar ese "10" a cada uno de los elementos.
np.array([1,2,3,4]) + 10

De forma similar, si tenemos una matriz (m,n) y sumanos una matriz (1,n), la segunda matriz se convertirá en una matriz (m,n), copiando la fila m veces.

Similar si tenemos (m,n) + (m,1), la segunda matriz se convertirá en (m,n), copiando la columna n veces).

Esto mismo sucede con el resto de operadores (suma, resta, multiplicación, división).
