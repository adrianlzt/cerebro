Tenemos un número de usuarios y algo a lo que dan una puntuación (películas por ejemplo).

Queremos lograr un algoritmo que nos estime la puntuación que daría un usuario a una película que aún no ha visto. De esa manera podremos recomendar películas cuyo hipotética puntuación sea alta a esos usuarios.

# Content-based recommender systems
Para cada película (siguiendo con el ejemplo de puntuaciones para películas), necesitamos tener unas features asociadas, que caractericen a la película.
Por ejemplo, podemos dar una puntuación entre 0 y 1 para las características:
 - romance
 - acción

Representaremos cada película por un vector de features.
En este caso añadiremos siempre x₀=1

Usaremos la siguiente  notación:
n = número de features (sin tener en cuenta x₀)
nᵤ = número de usuarios
nₘ = número de películas (movies)
mʲ = número de películas puntuadas por el usuario j

Lo que haremos es solventar una regresión lineal para cada usuario.
Usaremos Θʲ ∈ ℝ³ como la parametrización de esa regresión lineal para el usuario j
La puntuación del usuario j para la película i será: (Θʲ)ᵀ * xⁱ

Para solventar la regresión líneal buscaremos la minimización de la función de coste, donde usaremos regularización para evitar el overfitting.

Como tenemos varios usuarios (Θⁱ), añadiremos un sumatorio más.
DUDA: parece que se calcula la minimización de todos los usuarios, donde el Θ de un usuario afecta a los otros mediante el término de regularización (se suman todas las Θ.

Podemos usar gradient descent para solventar la minimización de la función de coste (J(Θ))



# Collaborative filtering
En este caso no necesitaremos tener features del producto. Las necesitaremos de los usuarios.
Los ratings de los usuarios ayudarán al sistema a generar mejores features para las pelis y de esta manera lograr mejores recomendaciones para los usuarios (por eso lo de "collaborative")

En este caso lo que tendremos serán los valores de Θ, porque los usuarios los habrán definido.
Por ejemplo, si tenemos las features:
 - romance
 - action

Un usuario puede definir su Θ como [0; 0; 5]
  0 es el término x₀, 0 de romance y 5 de acos valores de Θ, porque los usuarios los habrán definidlo.
  Por ejemplo, si tenemos las features:
   - romance
   - action

Un usuario puede definir su Θ como [0; 0; 5]
  0 es el término x₀, 0 de romance y 5 de acción

A partir de las votaciones de los usuarios, conociendo sus preferencias y las votaciones sobre distintas películas, estimaremos de que tipo es cada película.

Si sabemos que el usuario 1 ha dado un rating de 5 a una película, tenemos:
(Θʲ)ᵀ * xⁱ = 5

Para cada usuario sabemos su Θʲ y el rating. Nos quedará deducir xⁱ

Formalmente, queremos minimizar J(x)
minₓ (1/2) ∑ ((Θʲ)ᵀ * xⁱ) - y⁽ⁱʲ⁾)² + (λ/2)∑ₖ₌₁,ₙ (xₖⁱ)²


El problema es que con cualquiera de los métodos necesitamos datos iniciales.
Una solución para evitar tener que dar esos datos iniciales es estimar Θ para cada usuario.
A partir de ahí usaremos collaborative filtering para estimar los parámetros de las pelis (x).

Una vez tenemos esos parámetros, volvemos a estimar los Θ de los usuarios usando content-based systems.
Y seguimos iterando entre estos dos modelos hasta que lleguen a una convergencia con unos valores razonables.

Para evitar tener que ir iterando entre ambos algoritmos, lo que haremos es definir nuestra función de coste de manera que integremos las dos funciones ya definidas (la de obtener las Θ de los usuarios a partir de las x, y la de obtener x a partir de las Θ de los usuarios).

Uniendo esas J vemos que tenemos un término común (el cálculo de la "distancia") y luego los términos de regularización.

Aqui no usaremos el término x₀ ni Θ₀ (el algoritmo puede definir x₁=1 por si mismo si lo necesita), por lo tanto tendremos (n=número de features):
x ∈ ℝⁿ
Θ ∈ ℝⁿ


Para poner en marcha esta algoritmo haremos:
1. asignar valores pequeños a x¹...xⁿᵐ,Θ¹,...Θⁿᵘ (tenemos tantas x como películas y tantas Θ como usuarios)
2. minimzamos la cost functión usando gradient descent o algún otro algoritmo de optimización
3. para un usuario con parámetros Θ podremos estimar su rating para una película con features x (aprendidas) con: Θᵀ * x


## Vectorización del algoritmo
Definimos la matriz Y, donde cada fila es un usuario y cada columna una película.
Por lo tanto en y⁽ʲⁱ⁾ tendremos el rating del usuario i para la película j, que será:
(Θʲ)ᵀ * xⁱ

Podemos definir las matrices:
X, donde cada fila será (xʲ)ᵀ (nᵐ filas)
Θ, donde cada file será (θⁱ)ᵀ (nᵤ filas)

Y = X * Θᵀ
Este algoritmo se llama "low rank matrix factorization" (low rank es una propiedad matemática que tiene esta matriz que generamos)

Una vez tenemos xⁱ para cada película, podemos calcular la distancia entre las películas (||xⁱ-xʲ||), de esta manera sabremos las más relacionadas.
Esto se puede usar, por ejemplo, para recomendar películas a un usuario que esté navegando una película determinada.


## Mean normalization
En caso de que algún usuario no tenga puntuada ninguna película, mirando la función de coste que queremos minimizar, el único término que influirá será la suma de su Θ.
Como ese término solo colabora "negativamente", el algoritmo terminará asignando ceros al Θ del usuario.
Esto provocará es que para ese usuario la predicción de rating siempre sea cero.

Para evitar esto lo que haremos es calcular la puntuación media de cada película según los usuarios que si la hayan puntuado.
Y restaremos esa media a los valores de rating originales.
Por ejemplo, si un usuario tenía un rating de 5, pero la media sale 2, pues ahora en Y pondremos un rating de 5-2=3

Ahora usaremos esa Y con el algoritmo colaborativo.

Ahora para hacer predicciones tendremos que añadir de nuevo ese término, por lo quedará:
(Θⁱ)ᵀ * xⁱ + μᵢ

De esta manera, para el usuario que no tenía ningún rating, ahora su predicción será la media de las votaciones del resto de usuarios.
