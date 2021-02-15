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
