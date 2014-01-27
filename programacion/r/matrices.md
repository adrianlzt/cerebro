matrix(contenido,filas,columnas)
> matrix(7, 3, 4)
     [,1] [,2] [,3] [,4]
[1,]    7    7    7    7
[2,]    7    7    7    7
[3,]    7    7    7    7


Se puede inicializar con un vector que tenga el mismo número de valores:
> a <- 1:12
> matrix(a, 3, 4)
     [,1] [,2] [,3] [,4]
[1,]    1    4    7   10
[2,]    2    5    8   11
[3,]    3    6    9   12

Convertir un vector a matriz, rellena primero columnas luego filas: 1,1 2,1 3,1 ... 1,2 2,2 3,2 ...
> vector_to_matrix <- 1:8
> dim(vector_to_matrix) <- c(2,4)
> vector_to_matrix
     [,1] [,2] [,3] [,4]
[1,]    1    3    5    7
[2,]    2    4    6    8

> vector_to_matrix[2,4]
[1] 8
> vector_to_matrix[2,4] <- 16
> vector_to_matrix[2,]
[1]  2  4  6 16
> vector_to_matrix[,2:4] Cojo las últimas tres columnas
      [,1] [,2] [,3]
[1,]    3    5    7
[2,]    4    6   16

Contar rows:
nrow(var)

Para gráficas, mirar plot.md
