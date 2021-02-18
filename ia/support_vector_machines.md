Matemáticamente se parece a la regresión logística.
Si pintamos la gráfica de la cost function respecto a z, en vez de la curva logarítmica de la regresión logística, la svm lo parte en dos.
Una recta de pendiente constante y luego un tramo horizontal (esto para cada una de las gráficas, y=0, y=1).
La pendiente llega hasta z=1 y a partir se hace plana.

La función para y=1 se le llama: cost₁(z)
La función para y=0 se le llama: cost₀(z)

Estas nuevas funciones las metemos en la cost function de la logistic regression:
(1/m) Σ_i=1_m (y^i * cost₁(Θ^T * x^i) + (1-y^i) cost₀(Θ^T * x^i)) + ((λ/(2m)) Σ_j=0_n Θ²_j
Deberemos minimizar esta función para obtener el valor que queremos.

Por convención la fórmula cambia un poco, siguiendo haciendo la misma función.

Σ_i=1_m (y^i * cost₁(Θ^T * x^i) + (1-y^i) cost₀(Θ^T * x^i)9 + (λ/2) Σ_j=0_n Θ²_j
  se quita m, al final es una constante que no aporta

También se cambia el término de regularización.
Si en regresión logística teníamos: A+λB
En SVM tenemos: CA+B

Antes incrementar λ era darle más peso a la regularización.
Ahora darle más peso a C significa quitar peso a la regularización.

Al final la cost function a minimizar nos queda:
C * Σ_i=1_m(y^i * cost₁(Θ^T * x^i) + (1-y^i) cost₀(Θ^T * x^i)) + (1/2) Σ_j=0_n Θ²_j

En vez de obtener un porcentaje de probabilidad de 1 o 0, la SVM nos da:
h_θ(x) = {1 si Θ^T*X >= 0
         {0 en el resto de casos

Si pintamos cost₁ tenemos: una recta negativa que cae hasta x=1,y=0 y desde ahí vale y=0 para el resto de x>=1
Para cost₀ tenemos: y=0 para x<=1 y luego una recta positiva que sale desde x=-1,y=0

Si queremos obtener y=1, querremos que Θᵀx ≥ 1
Al contrario, para y=0 querremos Θᵀx ≤ -1
Con ≥ o ≤ 0 debería ser suficiente, pero con SVM queremos ese margen extra de seguridad.

Matemáticamente (la resolución del problema de minimización) esto consige que al clasificar grupos, SVM genera un "decision boundary" mejor que la regresión logística.
SVM "dibujará" una línea que esté lo más separada posible de las muestras.
Esa separación extra es lo que se llama "margen".
Como la regresión logística no hace eso (podría pintar su decision boundary muy pegado a las muestras), al SVM se le llama "Large margin classifier".
La idea, de nuevo, es que se haga una separación entre grupos, que no sea únicamente matemáticamente correcta, si no que se coloque de la forma más útil, como la colocaría un humano.
Esto sucede si tenemos un C muy grande.
Puede provocar que algún outlier genere una decision boundary errónea, no ignorando ese valor.
Pero al usar valores de C no tan grandes, si generará la línea correcta.

La explicación matemática: https://www.coursera.org/learn/machine-learning/lecture/3eNnh/mathematics-behind-large-margin-classification
Suponiendo que:
  Θᵀx ≥ 1 si yⁱ=1
  Θᵀx ≤ -11 si yⁱ=0
El optimization objetive es de reducir (1/2) Σ_j=0_n Θ²_j
Que para el caso de dos features (n=2), lo podemos poner como (1/2)(Θ₁²+Θ₂²) = (1/2)(√(Θ₁²+Θ₂²))² = (1/2) ||Θ||² = un medio de la longitud del vector theta al cuadrado

Ahora miramos al significado de Θᵀx
Usando el significado del inner product (https://elsenaju.eu/Determinant/Inner-product.htm): el resultado es la longitud de la proyección de x sobre Θ multiplicado por la longitud de Θ (||Θ||).
Usamos pⁱ como la longitud de esa proyección.
Entonces podemos decir que: Θᵀx = pⁱ * ||Θ|| = Θ₁*x₁ + Θ₂*x₂

Reescribimos nuestro objetivo de minimización:
minimizar (1/2) ||Θ||²
suponiendo que:
  pⁱ * ||Θ|| ≥ 1  si  yⁱ=1
  pⁱ * ||Θ|| ≤ -1  si  yⁱ=0

Suponiendo Θ₀ (haciendo que la decision boundary pase por el cruze de los ejes)
Se puede demostrar que Θ será perpendicular a la decision boundary.

Si ahora vemos como distintos valores de las muetras se comportan en nuestro objetivo de minimización podemos ver que:
 - queremos ||Θ|| pequeño
 - queremos que pⁱ*||Θ|| ≥ 1 (o ≤ -1, para los casos negativos, pero que al final es buscar lo mismo, ya que la pⁱ se hace negativa al ser valores en el sentido contrario a Θ)
 - lo que encontramos es que necesitamos que los pⁱ sean grandes, para lograr el ≥ 1 sin tener que incrementar ||Θ||

Lo que conseguimos es que la decision boundary se coloque lo más "lejos" de las muestras para lograr las proyecciónes (pⁱ) lo más grandes posibles.

La suposición de Θ₀ era simplemente para mostrar el ejemplo más sencillo, pero si hacemos Θ₀≠0 lo que conseguimos es poder mover el decisión boundary a cualquier parte (no obligándolo a que pase por el cruce de ejes).



# Kernel
Como implementar SVM

En la regresión lineal nuestras features eran polinómios.
Ahora a esas features les cambiamos la nomenclatura, las llamamos fₙ

Para generar nuestras nuevas features definimos unas "landmarks" (lⁱ), que son puntos en nuestro espacio muestral.
Cada feature la definimos como la "semejanza" entre las muestras y cada una de las landmarks:
f₁ = similarity (x,l¹) = exp(-(||x-l¹||²)/(2σ²))  siendo (||x-l|| la distancia euclídea entre el punto x y el landmark lⁱ: Σ_j=1,m (xⱼ - lⁱⱼ)²

Esta función "similarity" es lo que se llama "kernel".
En particular, esa elección que hemos hecho se llama "Gaussian kernel".
Existen distintos kernels.
La notación que usamos es: k(x,lⁱ)


Para ver como responde este kernel a distintos valores de x:
Si x≃lⁱ, la distancia será ~0: exp(-0²/(2σ²)) ≃ exp(0) ≃ 1
Si x está lejos de lⁱ: exp(-(large_number)²/(2σ²) ≃ exp (-(large number)) ≃ 0

fₙ será 1 si la muestra x está cerca de la landmark lⁱ, 0 en caso contrario.
Para cada muestra x, por cada landmark, obtendremos una fₙ

Visto en un plano 2D (si tuvíesemos solo dos features x₁, x₂ y σ=1), si representamos f₁ como la altura (eje z) sobre ese plano, tendríamos una "montaña" justo en el punto del landmark, que llegaría hasta el valor 1, y luego bajaría rápidamente para ser 0 en el resto de puntos:
https://imagineatness.files.wordpress.com/2011/12/gaussian.png
https://www.google.com/search?q=exp%28-%28x%5E2%2By%5E2%29%2F2%29

Si reducimos σ² logramos una pendiente más pronunciada. Si lo incrementamos, logramos una pendiente más suave.

Volviendo a nuestra hipótesis, suponemos que tenemos:
Θ₀ + Θ₁f₁ + Θ₂f₂ + Θ₃f₃ ≥ 0, que predice y=1
Imaginando que hemos entrenado ya el modelo y terminamos con: Θ₀=-0.5, Θ₁=1, Θ₂=1, Θ₃=0
Lo que estaríamos haciedo es un clasificador que devolvería y=1 cuando tuviésemos valores cercanos a los landmarks.
  cuando un punto x estuviese cerca de algún landmark, valdría 1, -0.5 = 0.5 → y=1
  cuando un punto estuviese lejos de todos los landmarks, valdría 0, -0.5 = -0.5 → y=0


Posicionar landmarks
En la práctica lo que haremos es poner una landmark por cada training sample.

Una vez tenemos las landmarks, para una muestra xⁱ calcularemos todas las fₙ=similarity(x,lⁿ)
Añadiremos también: f₀=1
Con esto tendremos el vector fⁱ

Como lⁱ se habrá posicionado en el mismo sitio que xⁱ, la feature fᵢ sabremos que es igual a 1.

Para la hipótesis tendremos, que y=1 si Θᵀf ≥ 0
Θ ∈ Rᵐ⁺¹, el vector Θ será un array de m+ elmentos (m muestras + f₀=1)

Para obtener Θ minimizaremos la función:
C * Σᵐᵢ₌₁(yⁱ * cost₁(Θᵀ * fⁱ) + (1-yⁱ) cost₀(Θᵀ * fⁱ)) + (1/2) Σᵐⱼ₌₁ Θ²ⱼ

En las implementaciones reales en vez de usar (1/2) Σᵐⱼ₌₁ Θ²ⱼ, se suele usar Θᵀ*M*Θ, por temas de eficiencia al computar.
Usar paquetes ya implementados para resolver Θ, es un problema complejo.


## Parameters
C grande (λ pequeño): lower bias, high variance (tienede a overfitting)
C pequeño (λ grande): higher bias, low variance (tienede a underfitting)


σ² grande, fᵢ varían lentamente: higher bias, low variance (tienede a underfitting)
σ² pequeño, fᵢ varían rápidamente: lower bias, high variance (tienede a overfitting)



# Utilizando SVM
Tendremos que especificar el kernel que queremos y el parámetro C.

## Linear kernel
En caso de no elegir kernel (linear kernel), estaríamos usando Θᵀx≥0 (sin convertir las features a fᵢ)
Puede ser una opció cuando tenemos muchas features (n grande) y pocas muestras (m pequeño), x ∈ Rⁿ⁺¹

## Gaussian kernel
Si elegimos usar el gaussian kernel tendremos que también elegir σ²
Puede ser útil cuando tenemos pocas features (n pequeño y m grande)
Puede que tengamos que implementar nosotros la función "similarity" para cada xᵢ y lᵢ

Usar feature scaling antes de usar el kernel gaussian, para evitar que ciertos términos con valores muy grandes sean los dominantes al calcular la distancia.

## Otros kernels
Para que una función "similarity" tiene que satisfacer la condición "teorema de Mercer", para asegurarnos que las optimizaciones funcionan y no diverge.

Polynomial kernel, de forma genérica: (xᵀl+o)ᵖ, no muy usado.
Otros más raros: string, chi-square, histogram intersection...



# Multiclass classification
Los paquetes que usemos puede que ya lo tengan implementado.
En caso contrario, podremos usar el método de one-vs-all
Entrenar K SVMs diferentes (siendo K el número de grupos a distinguir) y escoger como resultado y escoger el que tenga mayor (Θⁱ)ᵀx
