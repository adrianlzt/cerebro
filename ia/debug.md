# Posibles técnicas para mejorar un algoritmo
- Obtener más training examples
- Probar con más/menos features
- Añadir polynomial features (para el caso de linear regression)
- Incrementar/decrementar λ (learning rate)


# Evaluar una hipótesis
Separar nuestro dataset:
  60% traning set
  20% cross validation set (CV), también llamado validation set
  20% test set

Debemos escoger estos grupos de forma aleatoria, para evitar que haya alguna feature escondida en el ordenamiento.

Entrenaremos nuestro sisema con el training set, obteniendo θ para distintos modelos (o distintas parametrizaciones del modelo).
Luego usaremos el CV para elegir cual de esos modelos tiene un menor error (sobre ese CV set).
Finalmente, una vez elegido el modelo final, lo probaremos contra el test set.

Lo que estamos evitando es adaptar el modelo al test set, lo que nos daría una sobreestimación de la realidad.

Parece que una técnica habitual (https://scikit-learn.org/stable/modules/cross_validation.html#computing-cross-validated-metrics) es coger el training+CV sets y repetir el traning y la cross validation haciendo grupos diferentes de manera automática.



# Underfit / high bias (alto sesgo de que nuestro problema se basa en asunciones simples)
Un modelo que no se adapta bien.
Por ejemplo, una regresión lineal tipo a+bx para una serie de puntos que en realidad siguen una estructura a+bx+c^2

Lo reconoceremos por tener un error grande tanto en el traning set como en el CV set.



# Overfitting / high variance (el modelo varía mucho dependiento los datos que le des)
Una función que se adapta perfectamente a las muestras, pero falla al intentar generalizarse a nuevas muestras  (falla en la predicción)
Suele darse cuando tenenmos muchas features.
Esto puede deberse por una función de alto orden cuando tenemos pocas muestras.

Lo reconoceremos por tener un error pequeño en el traning set y un error mucho más grande en el CV set.

Afecta tanto a regresiones lineales como logísticas.

Posibles soluciones:
  reducir las features:
    - manualmente reducir el número de features
    - model selection algorithm (forma automática para reducir las features)

  regularizar:
    - quedarnos todas las features, pero reducir las magnitud/valores de los parámetros theta
    - funciona bien cuando tenemos muchas features, donde todas ellas contributen a predicir y



# Regularizar
Reducir los parámetros theta.
Gráficamente lo podemos ver como que si reducimos parámtros de theta cerca de cero, estamos anulando componentes, por lo tanto simplificando la función.
Generalizando esta idea, pequeños valores de theta nos dan una hipótesis más simple y por tanto menos propensa a overfitting.

Lo que haremos es añadir un término a nuestra "cost function" para "penalizar" (reducir) todos los theta.

Se añade al final de la cost function: lambda*∑ᵢ=₁,ₘ (theta²)
lambda = regularization parameter
Por convenio no se penaliza a theta₀
Excluir theta₀ quiere decir:
 - que no se suma en el término añadido para calcular la "cost function"
 - que no se suma el nuevo término a la hora de calcular la derivada parcial para theta₀

Se produce una "lucha" en la cost function, donde el primer término intenta adaptarse lo mejor posible a las muestras mientras que el segundo (el nuevo) término intenta reducir los valores de theta.
Si aumentamos theta, aumenta el valor de la "cost function", por lo que el global de la función (donde queremos conseguir un mínimo de la "cost function") no quiere subir mucho theta.

Podemos verlo simulando que ponemos un lambda muy muy alto, lo que provocaría que todos los theta₁,...,thetaₙ serían cercanos a 0, consiguiendo una línea recta (solo el término theta₀)

Detalles para regresión lineal: regresion.md
Detalles para regresión logística: clasificacion.md

## Elegir un valor de λ adecuado
Minimizar J(θ) para distintos valores de λ, por ejemplo subiendo en potencias de dos: 0, 0.01, 0.02, 0.04, ..., 10 (podríamos usar otros valores, estos son un ejemplo)
Obtenemos θ¹,θ²...θⁿ

Luego calcularemos J_cv(θ) para esas diferentes θ. En este caso J_cv(θ) solo calculará la suma de las distancias al cuadrado, sin el término de regularización.
Nos quedaremos con el θⁿ que nos de el menor J_cv(θ).
Usaremos ese θⁿ para calcular el error usando el test set (de nuevo, sin usar el termino de regularización)

Gráficamente, si elegimos:
 - λ muy grande no permitimos al modelo adaptarse, por lo que tendremos underfitting (errores tanto para J_train como para J_cv)
 - λ muy pequeña permitimos al modelo adaptarse demasiado, por lo que tendremos overfitting (errores bajos para J_train y altos J_cv)
