http://www.tensorflow.org/get_started/basic_usage.mdo

# Tensor
http://www.tensorflow.org/resources/dims_types.md

array multi-dimensional
Son del tipo: numpy ndarray

A tensor has a static type a rank, and a shape.

Para dimension=2 (matrices) la multiplicacion es:

(M,N) x (N,P) = (M,P)
Tenemos M elementos de tamaño N
Terminamos con M elementos de tamaño P

## Rank
Es la dimension del tensor.
scalar=0
vector=1
matriz=2
cubo de numeros=3
...

## Shape
Describe como es un tensor.
Un tensor puede tener n dimensiones (su rank) y en cada dimension nos dirá el tamaño del vector que allí se almacena:

>>> tf.constant(0).get_shape()
TensorShape([])

>>> tf.constant([1,2,3]).get_shape()
TensorShape([Dimension(3)])

>>> tf.constant([[1,1],[2,2],[3,3],[4,4]]).get_shape()
TensorShape([Dimension(4), Dimension(2)])
   La primera "Dimension" será el numero de elementos (filas)
   La segunda será el tamaño de esos elementos (columnas)

>>> tf.constant(
... [ 
...   [
...     [1,4,5,2],
...     [1,0,9,3]
...   ],
...   [
...     [3,4,3,2],
...     [2,0,5,9]
...   ],
...   [
...     [0,0,4,5] ,
...     [4,4,3,6]
...   ]
... ] 
... ).get_shape()
TensorShape([Dimension(3), Dimension(2), Dimension(4)])

Esto se puede ver como:
[A,B,C]
A = [X,Y]
X = [m,n,o,p]


## Types
http://www.tensorflow.org/resources/dims_types.md#data_types

tf.float32
tf.int32
tf.bool
...


# Grafos / operaciones
http://www.tensorflow.org/api_docs/python/framework.md#Graph

Los cálculos se representan como grafos.
Los nodos en los grafos son las operaciones.

Una operacion coge uno o varios tensores y devuelve 0 o más tensores.

## Construir un grafo
Empezamos con los extremos, donde ponemos los datos (también se consideran ops), como las constants y placeholders



# Session
http://www.tensorflow.org/api_docs/python/client.md#session-management

Para poder realizar los cálculos eficientemente, una vez tenemos definido nuestro grafo, se lo tenemos que pasar a una sesión.
Esta sesión cargará los datos en el dispositivo adecuado (CPU, GPU, etc), ejecutará la simulación y nos devolverá los datos.
Esto nos evita tener que andar trayendo los datos desde el dispositivo a python y de nuevo al dispositivo.

A run(x) le pasamos la variable de la que queremos obtener el valor.

Recordar cerrar la sessión al terminar: sess.close()

También se puede usar with:
with tf.Session() as sess:
    result = sess.run([product])
    print result

## Interactiva
mirar sesion_interactiva.md
