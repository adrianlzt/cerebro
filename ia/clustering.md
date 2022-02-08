https://towardsdatascience.com/the-5-clustering-algorithms-data-scientists-need-to-know-a36d136ef68
    K-means
    Mean-shift
    DBSCAN
    EM-GMM
    Agglomerative Hierarchical Clustering

Tabla comparativa
https://scikit-learn.org/stable/modules/clustering.html#clustering


Agrupar datos sin categorizar (sin "y")

Ejemplos de clustering:
  - market segmentation
  - social network analysis
  - organize computin clusters
  - astronomical data analysis


# K-Means
El algoritmo de clustering más popular.

Parece que no funciona bien con datos con mucha dimensionalidad: the course of dimensionality
    https://stats.stackexchange.com/questions/169156/explain-curse-of-dimensionality-to-a-child
    https://en.wikipedia.org/wiki/Curse_of_dimensionality
    https://youtu.be/0m5GNDo-CFM?t=63

Tenemos que decir cuantos clusters queremos.
Inicializaremos el algoritmo definiendo en nuestro espacio muestral N "centroids", tantos como número de clusters queramos.
Estos centroids se colocarán de forma aleatoria.
Cada muestra se asignará a uno de los centroids según su distancia (se asignará al más cercano).

Este algoritmo funciona de forma iterativa, usando dos pasos:
  - asignación de muestras a centroids (lo explicado antes)
  - movimiento de los centroids, movíendolos al punto que sea la media de los puntos encontrados

Repitiendo este algoritmo cada vez vamos logrando una mejor agrupación hasta que en una iteración no haya movimiento del centroid, que querrá decir que hemos llegado al mejor agrupamiento.


Este algoritmo tiene como datos de entrada:
 - K: número de clusters (siempre menos a m, no tendría mucho sentido lo contrario)
 - training set: x¹, x², ..., xᵐ

 xⁱ ∈ ℝⁿ (aqui no se usa lo de x₀=1)
 n: número de features
 m: número de muestras
 k: será el número de cluster al que nos estamos refiriendo


Algoritmo:
  1. Inicializar los centroids: μ₁, μ₂, ..., μₖ ∈ ℝⁿ
  Repetir:
    for i=1:m
      cⁱ = índice (entre 1 y K) del centroid más próximo a xⁱ (minₖ||xᵢ-μₖ||²). c²=4 quiere decir que la segunda muestra se ha asignado al cluster 4
    for k=1:K
      μₖ = media de los puntos asignados al cluster k (mover ese centroid). Sumamos esos vectores y dividimos por el cuantos tenemos.


En caso de que un centroid no tuviese puntos asignados existen dos opciones (no suele ser normal):
  - eliminar ese centroid (suele ser la opción más común)
  - reasignar aleatóriamente ese centroid (si realmente queremos ese número de clusters)



## Non-separated clusters
Puede que tengamos datos sin una clara separación.
K-means funcionará igualmente.
Un ejemplo es cuando se hace market segmentation, donde no va a existir una separación clara.
Lo que se hace es crear K grupos y luego adaptar nuestras políticas a cada uno de esos grupos, según K-means los ha separado.



## Optimization objective
Añadimos otra notación μ_cⁱ = que será el centroid para la muestra i

Cost function = Distortion = J(c¹,...,cᵐ,μ₁,...,μₖ) = (1/m) ∑ᵢ₌₁,ₘ ||xⁱ-μ_cⁱ||²
Queremos minimizar J para los distintos parámetros que tiene.

En el algoritmo que pusimos, es posible demostrar que la parte de asignación al centroid más próximo está consiguiendo minimizar J para c¹,...,cᵐ, manteniendo μ₁,...,μₖ fijos.
La segunda paso también se puede demostrar que minimiza J con respecto a μ₁,...,μₖ.

Si pintamos la gráfica de J según el número de iteraciones, deberá ser una gráfica siempre decreciente.



## Inicializar los centroids
Como generalmente se hace esta asignación es eligiendo de manera random K muestras y poniendo ahí los centroids.

Dependiendo de la inicialización podríamos terminar con valores de J que sean mínimos locales pero no el mínimo global (agrupaciones que satisfacen al algoritmo pero que no son las mejores).
Para mitigar en lo posible este problema, lo que se suele hacer es ejecutar el algoritmo varias veces haciendo, donde cada una eligirá las muestras donde inicializar los centroids.
Normalmente haremos esto entre 50 y 1000 veces.

for i=1:100
  inicializar centroids
  ejecutar K-means
  calcular distortion (J)

Elegir el clustering con menor J.

Esta estrategía funcionará para K entre 2 y 10.
Si tenemos un valor de K muy grande, normalmente una única iteración nos dará un resultado bueno, que no mejoraremos haciendo estas múltiples ejecuciones.



## Elegir el número de clusters (K) / Elbow method
Normalmente lo haremos manualmente visualizando los datos. O sabiendo lo que buscamos.
Algunas veces no será evidente el número de clusters que queremos. Algunas personas pueden decir un número y otras uno distinto.

Lo que podemos usar es graficar J (eje Y) respecto al número de clusters (eje X).

Al pintar esta gráfica deberemos ver según vamos aumentando K se va reduciendo J.
Debería existir un punto característico donde el ratio de descenso cambia de golpe, este sería el "codo" de la gráfica.
Este algoritmo sugiere que escojamos ese valor como K.

Pero algunas veces tendremos una curva muy suave donde no estará claro donde está el "codo".

Por lo que este algoritmo puede funcionar, pero no podemos esperar que lo haga siempre.


Ejemplo de elegir K cuando sabemos lo que buscamos.
Por ejemplo tenemos dos features, peso y altura, y queremos hacer unos grupos de tallas de camisetas.
Elegiremos el valor de K tomando en cuenta que implica para el negocio:
  - K mayor, camisetas que se ajustan más a cada cliente
  - K menor, menos costes de producción, camisetas más baratas

Esto lo que quiere mostrar es que seguramente elegir K sea un tradeoff. Otro ejemplo, comprimir una imagen, será un tradeoff entre calidad y tamaño del fichero.



## Compresión de una imagen
Se convierte la imagen a una matriz 3D con: posición X, posición Y, color.
El color será un número entre 0 y 255 (en caso de una imagen de 24 bits).
Por ejemplo, el pixel (1,1) tendría los colores (0.8588, 0.7059, 0.4039)
> A(1,1,1)
ans = 0.8588
> A(1,1,2)
ans = 0.7059
> A(1,1,3)
ans = 0.4039


Reordenamos la matriz en NumPixels x 3.
En cada fila tendremos un pixel con sus colores
Luego aplicaremos K-means sobre esa matriz (por ejemplo, K=16 para comprimir a 16 colores)
Elegimos los centroids de forma aleatoria sobre algúnos de los píxeles.
Y luego k-means va iterando.
Lo que conseguimos es mover los centroids a los colores que consigan representar la imagen de la mejor forma.
Ahora cada pixel los asignamos al centroid más cercano (cambiamos cada color por uno de los del centroid).
Reorganizamos los pixels en el formato de imagen y ya tenemos nuestra imagen comprimida.

La imagen original ocupaba 128x128x24 (imagen cuadrada de 128 pixels, con 24 bits de color)

La imagen comprimir 128x128x4 + 16x24 (mismos pixels, pero está vez solo con 16 colores, 4 bits. Y 16x24 son el mapeo de esos 16 colores a los 24 bits que nos dicen el color usado)

Jugando con los centroids elegidos podemos convertir la imagen a escala de grises, b/n, solo colores primarios, etc.
