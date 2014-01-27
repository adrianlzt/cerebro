Ejemplos para una función
example(rep)

sum(1,3,5)
rep("cadena",times=3)   Estamos pasando times como argumento a la función 'rep'

c(3,4,5)  Crea un vector con los valores 3 4 5

sin(1:100)


Muchas funciones tienen el parámetro na.rm = FALSE por defecto. Este param quiere decir que se borren (rm) los datos no disponibles (NA), y asi poder sacar el resultado
sum(a, na.rm = TRUE)

head(var,4) muestra los cuatro primeros valores/filas

ls()  variables en nuestro entorno
rm(var)  borrar variable del entorno

Si no queremos que de output
NUL <- func()
invisible(c("Hi"))
capture.output( cat("Hi\n"), file='NUL')   Esto tambien captura lo que va a stdout


Table, coge un montón de valores y nos dice cuantas ocurrencias de cada uno hay:
Viene muy bien para usar barplot()
> b = c(1,3,4,2,32,4,2,2,1,1,32,4,2,2)
> table(b)
b
 1  2  3  4 32 
 3  5  1  3  2 

