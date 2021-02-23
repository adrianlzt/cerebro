Nos dan datos con features, pero sin labels (sin "y").

El algoritmo tiene que encontrar alguna estructura en esos datos.



# Clustering
Uno de estos algoritmos es clustering, que nos agrupa los puntos según sus features.

Ejemplos de clustering:
  - market segmentation
  - social network analysis
  - organize computin clusters
  - astronomical data analysis


## K-Means
El algoritmo de clustering más popular.

Tenemos que decir cuantos clusters queremos.
Inicializaremos el algoritmo definiendo en nuestro espacio muestral N "centroids", tantos como número de clusters queramos.
Estos centroids se colocarán de forma aleatoria.
Cada muestra se asignará a uno de los centroids según su distancia (se asignará al más cercano).

Este algoritmo funciona de forma iterativa, usando dos pasos:
  - asignación de muestras a centroids (lo explicado antes)
  - movimiento de los centroids, movíendolos al punto que sea la media de los puntos encontrados

Repitiendo este algoritmo cada vez vamos logrando una mejor agrupación hasta que en una iteración no haya movimiento del centroid, que querrá decir que hemos llegado al mejor agrupamiento.


Este algoritmo tiene como datos de entrada:
 - K: número de clusters
 - training set: x¹, x², ..., xᵐ

 xⁱ ∈ |Rⁿ (aqui no se usa lo de x₀=1)
 n: número de features
 m: número de muestras
 k: será el número de cluster al que nos estamos refiriendo


Algoritmo:
  1. Inicializar los centroids: μ₁, μ₂, ..., μₖ ∈ |Rⁿ
  Repetir:
    for i=1:m
      cⁱ = índice (entre 1 y K) del centroid más próximo a xⁱ (minₖ||xᵢ-μₖ||²). c²=4 quiere decir que la segunda muestra se ha asignado al cluster 4
    for k=1:K
      μₖ = media de los puntos asignados al cluster k (mover ese centroid). Sumamos esos vectores y dividimos por el cuantos tenemos.


En caso de que un centroid no tuviese puntos asignados existen dos opciones (no suele ser normal):
  - eliminar ese centroid (suele ser la opción más común)
  - reasignar aleatóriamente ese centroid (si realmente queremos ese número de clusters)



### Non-separated clusters
Puede que tengamos datos sin una clara separación.
K-means funcionará igualmente.
Un ejemplo es cuando se hace market segmentation, donde no va a existir una separación clara.
Lo que se hace es crear K grupos y luego adaptar nuestras políticas a cada uno de esos grupos, según K-means los ha separado.
