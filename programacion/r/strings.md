> b <- 3
> paste(c("hola",b,"adios"),collapse=' ')
[1] "hola 3 adios"

> sprintf("hola: %i",b)
[1] "hola: 3"

El output no se puede guardar en una variable, está sacando a la salida estandar directamente
> cat("hola","adios",3,"fin\n")
hola adios 3 fin
