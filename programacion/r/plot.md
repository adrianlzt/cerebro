## Barplot # de barras
barplot(c(2,5,1))  Nos saca tres barras, la primera mide 2, la segunda 5 y la tercera 1
abline(h=3)   Pinta una línea horizontal a la "altura" 3 sobre la gráfica anterior

Si queremos etiquetas:
> x
 uno  dos tres 
  1    2    3 
> barplot(x)


## Plot ##
> x <- seq(1,20,0.1)
> y <- sin(x)
> plot(x,y)

> plot(1:4,1:4,pch=c(1,2,3,1));
El pch lo que hace es asignar un símbolo distinto para cada tipo de dato.

legend("topleft",c("circulo","triangulo","suma","equis"),pch=1:4)
Con la leyenda pintamos arriba a la izquierda los cuatro primeros tipos de 'plotting characters (pch)' que existen.



## Contour ##
Pinta un plano con curvas de nivel
> terreno <- matrix(0,10,10)
> terreno[1,] <- seq(1,2.8,0.2)
> terreno[1,] <- seq(1,1.9,0.1)
> terreno[2,] <- seq(1,2.8,0.2)
> terreno[3,] <- seq(1,3.7,0.3)
> terreno[3,] <- seq(1,4.6,0.4)
> contour(terreno)
Podemos usar también datos que vienen de ejemplo:
> contour(volcano)

## Persp ##
Perspectiva de un plano en 3D
> persp(terreno)
> persp(terreno,expand=0.4)  nos dice donde colocamos el punto más alto (achatamos un poco la figura para verla mejor)
Podemos usar también datos que vienen de ejemplo:
> persp(volcano)
persp(volcano, r=1, theta = 50, phi = 40, d=1)  Movemos el punto de vista según las coordenadas cilíndricas (ro,phi,theta). 'd' es un param para forzar la perspectiva

## Image ##
Crear un "mapa de calor"
> image(terreno)
> image(volcano)

## Histograma ##
> x <- c(1,1,1,1,1,1,1,2,2,2,3,4,5,6,3,3,3,4,9,10)
> hist(x)


## Multiples gráficas en una misma ventana ##
par(mfrow=c(2,2))  Creo un array de 2x2. Cada nuevo plot va rellenando la cuadrícula
plot(...)
plot(...)
plot(...)
plot(...)


Mirar: 
  ggplot2.md
  treemap.md

