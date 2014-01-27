Números: 1  -4  4.5
Strings (entre comillas): "hola que tal"
Booleanos: TRUE  FALSE
  O también: T  F
Variable nula: NA


Almacenar valor
> x <- 42
> x
[1] 42


## Vectores / Arrays ##

Crear vector:
> c(2,3,5)
[1] 2 3 5

No se pueden mezclar tipos distintos de datos dentro de un vector. Convertirá todo al mismo tipo (tipo texto seguramente)

Secuencias de números: 
> 5:9   o lo mismo con: seq(5,9)
[1] 5 6 7 8 9

Para cambiar el paso: seq(5,9,0.5)

> 9:5 + 1
[1] 10  9  8  7  6

> 1:3 + 4:6
[1] 5 7 9

La doc dice que debería darme un T/F por cada valor comparado (3 en este caso)
> seq(1,5,3) == seq(1,2,3)
[1]  TRUE FALSE



Para obtener uno de los valores
x[1]  (empieza a contar desde 1)
x[1:2] nos devuelve los dos primeros valores

Cambiar valor de un vector: x[2] <- "asd"

Podemos escribir en posiciones que no estén definidas. Las posiciones intermedias tomarán el valor NA.

sentence[5­:7] <- c('the', 'poop­', 'deck­')

> x[11:19] <- 9:1
> x
 [1]  1  2  3  4  5  6  7  8  9 10  9  8  7  6  5  4  3  2  1


# Key-value #
Podemos convertir un vector en un almacén de key-value
> x <- 1:3
> names(x) <- c("uno","dos","tres")
> x
 uno  dos tres 
  1    2    3 
> x["uno"]
uno 
  1


Convertir un vector a matriz
> vector_to_matrix <- 1:8
> dim(vector_to_matrix) <- c(2,4)
> vector_to_matrix
     [,1] [,2] [,3] [,4]
[1,]    1    3    5    7
[2,]    2    4    6    8

