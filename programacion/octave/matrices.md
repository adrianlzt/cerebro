https://octave.org/doc/v6.1.0/Simple-Examples.html#Creating-a-Matrix

A = [ 1, 1, 2; 3, 5, 8; 13, 21, 34 ]
primera línea sería: 1 1 2

Acceder a un valor:
A(3,2) -> 21
A(1) == A(1,1)

A(1,:) -> la primera fila
A(:,1) -> la primera columna

A(5:end,1) -> las filas de la 5 a la última de la primera columna

A([1 3],:) -> la primera y tercera fila

A(1, :) = [9 9 9]
  cambiar los valores de la primera fila por nueves

A = [A, [5; 5; 5]]
  añadir una nueva columna a la derecha
  tambien podemos hacerlo al revés para añadir la columna al principio: A = [[5;5;5], A]

C = [A B]
C = [A,B]
  une A y B a lo ancho (añade las columnas de B a las de A)

C = [A;B]
  añade como filas

A(:)
  convierte la matriz en un vector, pone primero la primer columna, luego la segunda, etc

# Vector
v = [1;2;3]
Tambien:
v = [1
2
3]

Para acceder a sus valores:
v(2:3)
  posiciones 2 y 3 incluídas



Transpuesta
A'

Inversa
inv(A)

Pseudoinversa (evita infinitos, es la que usaremos normalmente)
pinv(A)

Multiplicar
A*B
Si queremos multiplicar elemento a elemento
A .* B

Para multiplicar dos vectores:
A'*B
que sería equivalente a sum(A.*B), pero A'*B es más eficiente (más rápida)



Cada elemento al cuadrado
A .^ 2

eye(2) ./ [1 2]
  divide la primera columna por 1
  divide la segunda columna por 2

En general el "." son "element-wise" operations


log(v)
exp(v)
abs(v)
  estos tambien actuan por elemento

a<3
  element-wise comparasion

find(a<3)
  es como un "map", nos devuelve los índices que cumplan esa condición
  filtrar una serie de valores por una condición
[a,b]=find(X,Y]
  siendo X una matriz (n,m) e Y un vector fila (1,m)
  a nos da la posición (entre 1 y m) de cada columna (m) (mirar help para que quede más claro)

[r,c] = find(A >=7)
  (r[0],c[0]) será la posición del primer elemento que sea >=7

[valor, índice_posicion] = max(v)

max(A,[],1)
  nos devuelve el máximo por columna

max(A,[],2)
  nos devuelve el máximo por fila

max(max(A))
max(A(:))
  valor máximo en toda la matriz

sum(v)
  sumar todos los valoreg

sum(A,1)
  suma por columnas

sum(A,2)
  suma por filas

prod(v)
  multiplicar todos los valores

floor(v)
  redondear hacia abajo

ceil(a)
  redondear hacia arriba



V+1
  suma uno a cada elemento


# Rangos
Especificando el step
1:0.1:2

O especificando cuantos puntos queremos (100 puntos entre 0 y 10, incluídos):
linspace(0,10,100)

Similar, pero con una función logarítmica:
logspace(-2,3,20))




Matriz de unos:
ones(2,3)

flipud(A)
  le da la vuelta upside-down

Matriz de ceros:
zeros(2,3)

Matriz de números random
rand(2,3)

Si queremos media 0 y desviación estandar de 1 (no de forma estrícta, se acercarán a esos valores cuando más grande sea el vector):
randn(1,3)

Matriz identidad
eye(3)

magic(3)
  matriz de 3x3 donde sus columnas, filas y diagonales suman lo mismo. Útil para generar matrices "random"

Tamaño/size
size(A)
size(A, 1)
  nuḿero de rows
size(A, 2)
  nuḿero de columnas

length(V)
  tamaño del vector
  o el mayor de rows/cols para una matriz
