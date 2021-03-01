PCA (Principal component analysis) encuentra una superficie de una dimensión menor donde las distancias de los puntos reales a ese plano sean lo más pequeñas posibles.
En el caso de tener una gráfica 2D y querer pasar a 1D. PCA buscará la línea que "pase más cerca" de todos los puntos.

Normalmente antes de aplicar PCA haremos feature scaling (rango de todos los valores entre unos valores pequeños) y normalización de la media (media de todos los valores y generalmente σ=1).

Más formalmente, para reducir de una dimensión n a una dimensión k, buscaremos k vectores (u¹, u², ... uᵏ) que definan un subespacio linear donde consigamos minimizar el error de proyección.

Se parece un poco a la regresión lineal, pero en esta lo que hacemos es reducir el error de la predicción sobre el eje "y" (línea paralela al eje "y" que une la línea de regresión lineal con la muestra), mientras que en PCA lo que hacemos es reducir el error de proyección (linea perpendicular al subespacio definido por PCA que une la muestra con dicho subespacio)
En PCA no hay una variable "especial", la que sería "y" en una regresión lineal.

NO usar para intentar evitar overfitting reduciendo la dimensionalidad (PCA elimina parte de la información, sin conocer los labels)
Usar regularización en vez de PCA para esto.

No usar PCA por defecto. Intentar simempre usar los datos "crudos", ya que contienen toda la información. Solo si eso no nos vale, usar PCA.

Ejemplo del efecto de PCA en una imagen: https://slideplayer.com/slide/4923694/16/images/26/PCA+for+image+compression.jpg
Por ejemplo, para el caso de varias muestras que son caras de gente.
Lo que está haciendo PCA es generar K patrones de cara distintos y asocia cada cara original a uno o varios patrones.
Podríamos pensar que estos patrones son: nariz, orejas, ojos, boca, etc. Y para cada cara le va poniendo los patrones necesarios para generar la cara que necesita.



# Algoritmo

## Preprocesado
Hacer mean normalization (tener media cero).
Y, dependiendo de los datos, feature scaling. Esto será necesario si la escala de las distintas dimensiones no es similar (que no haya una feature con valores 1-1000 y otra con 0-0.1).

## PCA
La demostración matemática de que un determinado punto de una dimensionalidad mayor es otro determinado en una dimensionalidad menor es compleja.
Pero el procedimiento para conseguir estos valores no es complejo.

Primero calcularemos la matriz covariante (esa matriz se llama sigma Σ, cuidado que se parece mucho al símbolo de sumatorio ∑)

Σ = (1/m) ∑ᵢ₌₁,ₙ (xⁱ)(xⁱ)ᵀ = (1/m) * Xᵀ * X   (vectorizada)
Σ ∈ ℝⁿˣⁿ

Ahora calcularemos los "eigenvectors" de la matriz Σ. Esto se hará con una función llamada "singular value decomposition".
En octave sería:
[U,S,V] = svd(Sigma)
U otra opción válida para nuestro caso (para la matriz Σ), pero menos estable numéricamente:
[U,S,V] = eig(Sigma)

U ∈ ℝⁿˣⁿ
Esta matriz contendrá los vectores donde queremos realizar la proyección de nuestros datos.
A cada vector de U le llamaremos u¹,...uⁿ
Usaremos los primeros k vectores de esa matriz para reducir la dimensionalidad de n a k.

Al coger los primeros k vectores de U generamos otra matriz que llamaremos U_reduce ∈ ℝⁿˣᵏ
Para convertir cada muestra (x) al nuevo subespacio haremos:
z = U_reduceᵀ * x
Las dimensiones serán: k x n * n x 1 -> k x 1

Aqui tampoco se usa la convención x₀=1.



## Reconstrucción a partir de la representación compresión
Para poder volver a un valor aproximado al original haremos:
x_approx = U_reduce * zⁱ

x_approx será un valor aproximado a la x original que reducimos dimensionalmente.



## Como elegir k
Un par de definiciones que usaremos.

Avgerage squared projection error: (1/m)∑ᵢ₌₁,ₘ ||xⁱ - x_approxⁱ||²
  cuanto error cometemos al comprimir
Total variation in the data: (1/m)∑ᵢ₌₁,ₘ ||xⁱ||²
  como de lejos están mis puntos del origen (0,0)

Normalmente elegiremos k lo más pequeña posible pero validando:
((1/m)∑ᵢ₌₁,ₘ ||xⁱ - x_approxⁱ||²) / ((1/m)∑ᵢ₌₁,ₘ ||xⁱ||²) ≤ 0.01  (1%)

Esto también se dice como: "99% of variance is retained".
Creo que se puede entender como cuanto de la posición origial estamos respetando.

Cuando elegimos un parámetro k en realidad lo que hacemos es decidir el valor ese de 1% cuanto queremos que valga y a partir de ahí elegimos k.
Otros valores típicos es 5%, 10%


### Algoritmo
Haremos iteraciones empezando por k=1, viendo que variance retained. Si es más alto de lo que queremos, pasamos a k+=1
Pero este método es muy ineficiente.

Otra forma es usar la matriz S, de "svd":
[U,S,V] = svd(Sigma)

S es una matriz diagonal (todo fuera de la diagonal es 0). Solo tenemos valores en s₁₁, s₂₂,...sₙₙ
Usando esos valores, para obtener el porcentaje de varianza (el 1%) haremos:

1 - ( ∑ᵢ₌₁,ₖSᵢᵢ / ∑ᵢ₌₁,ₙSᵢᵢ) ≤ 0.01
  sumamos solo k términos entre la suma de todos los términos

También escrito:
∑ᵢ₌₁,ₖSᵢᵢ / ∑ᵢ₌₁,ₙSᵢᵢ ≥ 0.99

Con esto, iremos probando diferentes valores de k hasta lograr el porcentaje de variance retained que queramos.



## Ejemplo usando PCA para acelerar un algoritmo de ML
Tenemos una imagen de 100x100 pixels y su label ( (x¹,y¹),...(xᵐ,yᵐ) ), esto nos da x∈ℝ¹⁰⁰⁰⁰

Lo que hacemos es extraer todos los inputs (x¹,...xᵐ) de nuestras muetras y aplicar PCA.
Esto nos dará un nuevo conjunto de datos (z¹,...zᵐ), por ejemplo de x∈ℝ¹⁰⁰⁰

Luego usaremos un algoritmo de ML que nos dará una hipótesis basada en esos z:
h_Θ(z)

Para ahora estimar el resultado para un nuevo valor x, le aplicaremos PCA con los mismos parámetros (U_reduce).
Los parámetros de normalización, feature scaling y PCA solo deben extrarse del training set (no del CV set y/o test set)

Es decir, aplicaremos PCA al training set y de ahí obtendremos U_reduce. Luego, cuando queramos pasar nuevos valores por nuestra hipótesis los convertiremos con esa U_reduce.
(parecido con la mean normalization y feature scaling)
