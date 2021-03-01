Vamos a crear un módelo p(x) que nos de la probabilidad de tener una serie de features.
Si para p(x_test) < ε, lo marcaremos x_test como anómalo, ya que tiene una probabilidad muy baja de ocurrir.

El típico ejemplo es detección de fraude. Modelando la actividad de los usuarios, creando el modelo y luego viendo que usuarios tienen baja probabilidad.

También para monitorización de sistemas.
Recopilamos distintas features: uso cpu, uso cpu/network traffic, memoria, tráfico de red, iops disco

Lo que haremos es asumir que la distribución es normal (distribución de gauss) y buscar los parámetros μ y σ²

Para estimar μ haremos la media de los puntos:
μ = (1/m) ∑ᵢ₌₁,ₘ xⁱ

Para calcular la varianza:
σ² = (1/m) ∑ᵢ₌₁,ₘ (xⁱ - μ)²
  la podemos entender como la media de las distancias a μ



# Algoritmo
Si queremos aplicar lo anterior a un serie de features (x ∈ ℝⁿ), lo que haremos es multiplicar la p(x) de cada componente:
p(x) = p(x₁; μ₁,σ²₁)p(x₂;μ₂,σ²₂)...p(xₙ;μₙ,σ²ₙ) = ∏ⱼ₌₁,ₙ p(xⱼ; μⱼ,σ²ⱼ)


Para ejecutar el algoritmo.
Cogeremos n features (xᵢ).
Calcular los parámetros:
μⱼ = (1/m) ∑ᵢ₌₁,ₘ xⱼⁱ
σ²ⱼ = (1/m) ∑ᵢ₌₁,ₘ (xⱼⁱ - μⱼ)²

Dado un nuevo valor, calcularemos p(x) = ∏ⱼ₌₁,ₙ p(xⱼ; μⱼ,σ²ⱼ) = ∏ⱼ₌₁,ₙ (1/(√(2π)*σⱼ)) exp(-(x-μⱼ)²/(2σⱼ²))

Diremos que es una anomalía si p(x) < ε



# Evaluación del algoritmo
Para poder evaluar el algoritmo necesitamos que algunas de las muestras esten etiquetadas.


Lo ideal es entrenar el algoritmo solo con muestras no anómalas, aunque no sucederá nada si se cuelan algunas anómalas.

En el cross validation set y test set deberemos tener muestras etiquetadas con valores anómalos y no anómalos.

Normalmente tendremos un número muy largo de muestras no anómalas (digamos 10k) y un pequeño grupo anómalo (2-50).
En el caso de 10k normales y 20 anómalos podríamos dividir de la siguiente format:
  training set: 6000 buenas
  CV: 2000 buena, 10 anómalas
  test: 2000 buena, 10 anómalas

Haremos el entrenamiento con nuestro training set.
Prediciremos el valor del CV set y calcuaremos el F₁-score (también podríamos usar precision/recall, pero F₁ nos da un único valor, más sencillo para trabajar)
Ajustaremos ε para maximizar este F₁-score.

Si queremos saber si añadir/quitar otros parámetros nos ayuda, usaremos este F₁-score con el test set para ver si estamos mejorando o empeorando.
