Reducir la dimensionalidad puede tener varias útilidades


# Data compresion
Este algoritmo se suele usar para comprimir los datos, tanto para lograr un menor tamaño en un fichero, como para reducir las features de unos datos de entrada para acelerar otros algoritmos de ML.

Para comprimir los datos una cosa que podemos hacer es buscar métricas con una fuerte correlación y dejarlas en una única dimensión.
Por ejemplo, tal vez estamos usando la medida de algo en centímetros y en inches (puede que estos valores se hayan redondeado por lo que no sean exáctamente lineales).
Si quitamos una de esas dos features no perdemos información y conseguimos reducir una dimensión.

Otro ejemplo sería si tuvíesemos una feature que fuese las habilidades de un piloto y su disfrute pilotando. Seguramente esas dos estén fuertemente correladas, por lo que la podríamos cambiar por algo tal vez tipo la aptitud del piloto.

Si originalmente teníamos x¹ ∈ |R² ahora tendremos z¹ ∈ |R
Habremos reducido su dimensión, antes era (x₁¹, x₂¹) ahora z₁¹.
Lo hemos logrando proyectando el número sobre una línea.

Reducimos la memoria y almacenamiento necesario para usar estos datos.
Y ejecutar algoritmos de ML más rápido.

En el caso de 3D -> 2D lo hacemos de manera similar.
Tendremos que encontrar un plano en ese espacio donde se encuentren, más o menos, lo puntos, esa será la correlación.
Luego proyectaremos todos los puntos sobre ese plano, reduciendo su dimensionalidad.
Donde antes teníamos coordenadas basadas en x₁, x₂ y x₃ ahora se basarán en z₁ y z₂

En ejemplos reales tal vez reducimos 1000D en 100D




# Visualización
Conseguir reducir la dimensionalidad a 2D o 3D nos permite visualizar los datos.




# Principal component analysis (PCA)
Algoritmo para lograr reducir la dimensionalidad.
pca.md
