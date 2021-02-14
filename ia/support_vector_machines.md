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
         {o en el resto de casos
