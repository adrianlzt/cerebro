PCA (Principal component analysis) encuentra una superficie de una dimensión menor donde las distancias de los puntos reales a ese plano sean lo más pequeñas posibles.
En el caso de tener una gráfica 2D y querer pasar a 1D. PCA buscará la línea que "pase más cerca" de todos los puntos.

Normalmente antes de aplicar PCA haremos feature scaling (rango de todos los valores entre unos valores pequeños) y normalización de la media (media de todos los valores y generalmente σ=1).

Más formalmente, para reducir de una dimensión n a una dimensión k, buscaremos k vectores (u¹, u², ... uᵏ) que definan un subespacio linear donde consigamos minimizar el error de proyección.

Se parece un poco a la regresión lineal, pero en esta lo que hacemos es reducir el error de la predicción sobre el eje "y" (línea paralela al eje "y" que une la línea de regresión lineal con la muestra), mientras que en PCA lo que hacemos es reducir el error de proyección (linea perpendicular al subespacio definido por PCA que une la muestra con dicho subespacio)
En PCA no hay una variable "especial", la que sería "y" en una regresión lineal.


# Algoritmo

## Preprocesado
Hacer mean normalization (tener media cero).
Y, dependiendo de los datos, feature scaling. Esto será necesario si la escala de las distintas dimensiones no es similar (que no haya una feature con valores 1-1000 y otra con 0-0.1).

## PCA
La demostración matemática de que un determinado punto de una dimensionalidad mayor es otro determinado en una dimensionalidad menor es compleja.
Pero el procedimiento para conseguir estos valores no es complejo.

Primero calcularemos la matriz covariante (esa matriz se llama sigma Σ, cuidado que se parece mucho al símbolo de sumatorio ∑)

Σ = (1/m) ∑ᵢ₌₁,ₙ (xⁱ)(xⁱ)ᵀ
Σ ∈ |Rⁿˣⁿ

Ahora calcularemos los "eigenvectors" de la matriz Σ. Esto se hará con una función llamada "singular value decomposition".
En octave sería:
[U,S,V] = svd(Sigma)
U otra opción válida para nuestro caso (para la matriz Σ), pero menos estable numéricamente:
[U,S,V] = eig(Sigma)

U ∈ |Rⁿˣⁿ
Esta matriz contendrá los vectores donde queremos realizar la proyección de nuestros datos.
A cada vector de U le llamaremos u¹,...uⁿ
Usaremos los primeros k vectores de esa matriz para reducir la dimensionalidad de n a k.

Al coger los primeros k vectores de U generamos otra matriz que llamaremos U_reduce ∈ |Rⁿˣᵏ
Para convertir cada muestra (x) al nuevo subespacio haremos:
z = U_reduceᵀ * x
Las dimensiones serán: kxn * nx1 -> kx1

