## Media ##
> mean(1:9)
[1] 5

## Mediana ##
Ordenamos los elementos de menor a mayor y escogemos el del medio
Si son pares, hacemos la media entre los dos del medio.
> x <- c(1,89,5,2,6)
> median(x)
[1] 5
> x <- c(1,15,2,6)
> median(x)
[1] 4

## Desviación estándar ##
Los estadísticos usan el concepto de "desviación estándar" para describir el rango de valores típicos de un conjunto.
Para un grupo de números, muestra cuanto varían del valor medio.
Para calcular este valor, se calcula la media de los valores, se resta la media a cada valor, este resultado se pone al cuadrado, se hace la media de estos valores, y por último la raiz cuadrada.
Se usa la correción de Bessel (dividir entre N-1)
desviacion_estandar_de_x <- sqrt((sum((x-mean(x))^2))/(length(x)-1))
desviacion_estandar_de_x <- sd(x)

> x <- 1:20
> sdx <- sd(x)
> barplot(x); abline(h=mean(x)); abline(h=mean(x)+sdx); abline(h=mean(x)-sdx);
Los valores dentro de las líneas de desviación estandar se consideran "normales".

