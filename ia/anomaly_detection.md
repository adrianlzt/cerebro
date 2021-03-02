Mirar distribucion_de_gauss.md

Vamos a crear un módelo p(x) que nos de la probabilidad de tener una serie de features.
Si para p(x_test) < ε, lo marcaremos x_test como anómalo, ya que tiene una probabilidad muy baja de ocurrir.

Este modelo funciona mejor que supervised learning cuando tenemos muchas muestras negativas y unas pocas positivas.
Si tenemos muchas negativas y positivas mejor usar supervised learning.
Podemos verlo con que hay muchos tipos de anomalías, por lo que conseguir suficientes muestras anómalas para entrenar el sistema sería complicado.
También dependerá la elección si consideramos que las futuras anomalías serán parecidas a las que hemos ya recolectado.

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



# Como elegir las features
Lo mejor es coger features que tengan una distribución gausiana.
Si no la tienen, el algoritmo puede funcionar, pero no tan bien.
Podemos ver la distribución con un histograma.

Podemos aplicar transformaciones a los datos para lograr que la distribución se parezca más a una gausiana.
Por ejemplo:
  x₁ → log(x₁)
  x₂ → log(x₂+c)
  x₃ → x₃^(1/2)
  x₄ → x₄^(1/3)


Otro problema típico es encontrarnos que p(x) tiene valores similares para valores anómalos y normales.
Lo que podremos hacer es analizar alguno de los casos anómalos y ver que features podríamos añadir con las que consigamos distinguir ese caso de los normales.

Elegir features que varien mucho también será una buena estrategía para poder diferenciar correctamente las muestras.

También podemos crear features combinando otras y usando transformaciones, por ejemplo cpu²/network_traffic



# Problemas al usar múltiples gausianas univarantes
Con gausianas univariantes podemos tener casos de muestras anómalas (por su distribución en varias variables), pero que para cada variable tenga un valor en el rango "normal".
Por ejemplo, tenemos un sistema de detección de anomalías que usa la CPU y memoria. Tal vez tenemos un servidor con un uso muy alto de memoria pero muy poca CPU, que representado respecto al resto de muestras se ve como una anomalía. Pero si analizamos p(x) aisladamente para la memoria y para la CPU, los valores entran en rangos normales.
Para solventar estos problemas usaremos gausianas multivariantes.



# Algoritmo con gausiana multivariante
Si ahora tenemos {x¹,x²,...xᵐ} con x ∈ ℝⁿ, para obtener los parámetros haremos:
μ = (1/m) ∑ᵢ₌₁,ₘ xⁱ
Σ = (1/m) ∑ᵢ₌₁,ₘ (xⁱ - μ)(xⁱ - μ)ᵀ


Cuando tengamos una muestra, calcularemos p(x) con la fórmula de gausiana multivariante y decidiremos si es anómala si la probabilidad es menor a ε


## Diferencia entre univariante y multivariante
La multivariante será equivalente al resultado de las univariantes si los términos fuera de la diagonal de la matriz Σ son cero.
Lo que nos aporta la multivariante es "rotar" la distribución, que deje de ser simétrica respecto a los ejes x₁,x₂


## Cuando usar cada uno
### Modelo con múltiples univariantes
- Si tenemos correlaciones, tendremos que crear a mano una feature que las una (ej.: cpu/memoria)
- Más rápida (escala mejor cuando tenemos muchas features)
- Funciona bien con pocas muetras

### Modelo multivariante
- Captura automáticamente correlaciones entre features
- Más cara de ejecutar
- Necesita tener más muestras que features (si no Σ no es invertible, así que no podemos usar este modelo). Solo usaremos este modelo si m ≥ 10*n
- Si se da el caso de que Σ es singular (no invertible), y tenemos m>n, será porque tenemos features redundantes (x₁=x₂ o x₃=x₄+x₅, features linealmente dependientes)
