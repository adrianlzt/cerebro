# Posibles técnicas para mejorar un algoritmo
- Obtener más training examples -> fix high variance (cuanto más datos más le va a costar crear un modelo que se adapte perfecto, por lo que estará generalizando)
- Probar con menos features     -> fix high variance (le quitamos datos para que no se pueda reconocer tan bien el traning set)
- Probar con más features       -> fix high bias
- Añadir polynomial features    -> fix high bias (tenemos un modelo muy sencillo, forzamos que sea más complejo)
- Decrementar λ                 -> fix high bias
- Incrementar λ                 -> fix high variance (no le dejamos adaptarse completamente al trainig set)


# Evaluar una hipótesis
Separar nuestro dataset:
  60% traning set
  20% cross validation set (CV), también llamado validation set
  20% test set

Debemos escoger estos grupos de forma aleatoria, para evitar que haya alguna feature escondida en el ordenamiento.
Cuidado, no siempre tenemos que aleatorizar los datos.
En datos que contengan temporalidad, podría no ser el caso (ejemplo: noticias que están ordenadas por fecha de publicación, si aletorizamos, el test set serán noticias de fechas cercanas al training set, pero en la realidad las fechas será nuevas y darán un peor error, tendremos overfitting).

Entrenaremos nuestro sisema con el training set, obteniendo θ para distintos modelos (o distintas parametrizaciones del modelo).
Luego usaremos el CV para elegir cual de esos modelos tiene un menor error (sobre ese CV set).
Finalmente, una vez elegido el modelo final, lo probaremos contra el test set.

Lo que estamos evitando es adaptar el modelo al test set, lo que nos daría una sobreestimación de la realidad.

Parece que una técnica habitual (https://scikit-learn.org/stable/modules/cross_validation.html#computing-cross-validated-metrics) es coger el training+CV sets y repetir el traning y la cross validation haciendo grupos diferentes de manera automática.



# Underfit / high bias (alto sesgo de que nuestro problema se basa en asunciones simples)
Un modelo que no se adapta bien.
Por ejemplo, una regresión lineal tipo a+bx para una serie de puntos que en realidad siguen una estructura a+bx+c^2

Lo reconoceremos por tener un error grande tanto en el traning set como en el CV set.

Añadir más muestras no reducirá el error (mirar learning curve para la explicación).



# Overfitting / high variance (el modelo varía mucho dependiento los datos que le des)
Una función que se adapta perfectamente a las muestras, pero falla al intentar generalizarse a nuevas muestras  (falla en la predicción)
Suele darse cuando tenenmos muchas features.
Esto puede deberse por una función de alto orden cuando tenemos pocas muestras.

Lo reconoceremos por tener un error pequeño en el traning set y un error mucho más grande en el CV set.

Añadir más datos puede ayudar, ya que las gráficas tienden a converger (mirar learning curve para la explicación).

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




# Learning curves
Creamos una gráfica donde el eje X es el tamaño del training set y en el eje "y" ponemos el error.
Pintamos los valores de J_train y J_cv.
Para pintar J_train iremos cogiendo 1 muestra, 2 muestras, 3, etc. Entrenaremos el modelo con ese subset, obteniendo θ y luego calcularemos J_train como el error de ese subset para esa θ.
J_cv será el error sobre el cross validation set usando la θ del paso anterior, aquí siempre usaremos todas las muestras del cv set.

Para J_train, con m pequeño, tendremos un error pequeño (es fácil crear un modelo perfecto para pocos valores).
Según vaya creciendo m iremos teniendo más error.

Para J_cv será al contrario. Con m pequeño, el modelo que se adaptaba perfectamente a el training set se adaptará muy mal al CV, por lo que tendremos un error muy grande.
Según vaya creciendo m se irá reduciendo ese error.

High bias (underfitting)
J_train partirá de casi 0, y según aumentemos m irá subiendo hasta llegar a un valor donde se estabilizará.
J_cv partirá de un error muy grande e irá bajando hasta estabilizarse, en un valor superior, pero muy parecido, a J_train
Ambos J tendrán un alto error cuando tengamos un número suficiente de muestras, con valores muy parecidos.
Añadir más muestras no reducirá el error

High variance (overfitting)
J_train empezará bajo (como siempre), pero esta vez subirá menos, ya que como estamos adataptando el módelo exáctamente el training set, nunca tendremos mucho error.
J_cv comenzará alto, pero nunca logrará bajar mucho su error.
La diferencia de errores entre ambas J será alta.
Añadir más datos puede ayudar, ya que las gráficas tienden a converger. Podremos lograr un error que se encuentre entre ambos valores.
