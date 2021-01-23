# Artificial Intelligence (AI)
Inteligencia humana exhibida por máquinas
Ahora mismo solo existe el "narrow AI". Sistemas que pueden una función, o un conjunto de funciones, mejor que un humano.

# Machine learning
mirar esquema.md
It’s the ability for an algorithm to learn from prior data in order to produce a behavior/find patterns.
Es una aproximación a la AI

Sin ML haríamos un programa con un montón de if-else para crear el algoritmo que necesitamos.
Con ML le pasamos unos datos, le pedimos que los clasifique y luego le decimos que modifique sus parámetros para reducir los errores.

## Supervised Machine Learning
mirar supervised_learning.md


## Unsupervised Machine Learning



## Deep learning (implementación de ML)
Una de las técnicas es DNNs (deep neural networks): buscar patrones a base de superponer capas de neuronas artificiales.

Una capa ve pixeles, otra entiende bordes, otra ..., hasta que reconoce una cara, por ejemplo.


# Natural Language Understanding (NLU)
Entender en lenguaje humano


# Context Awareness
Poder entender todo el contexto al rededor de una pregunta o acción es vital para poder comprenderla enteramente o actuar correctamente.


# Features / attributes
Propiedades de las cosas sobre las que queremos aprender.
Por ejemplo, en una naranja, su color y su peso.
Para detectar un cancer: edad, tamaño, grosor de los grupos, uniformidad del tamaño, uniformidad de la forma
Saber elegir que features necesitamos clasificar para distinguir los elementos de nuestro ML es básico y muchas veces no trivial.
En el reconocimiento de imágenes cada pixel se considera una feature.

Pocas features pueden hacer que no sepamos distinguir los elementos.
Muchas features pueden provocar "overfitting". Esto quiere decir que el sistema reconoce perfectamente el dataset de aprendizaje, pero no puede generalizar.
Ha aprendido exactamente lo que le hemos enseñado, pero los nuevos elementos, como no son iguales a los que ha visto, no sabe categorizarlos.


# Underfit / high bias
Un modelo que no se adapta bien.
Por ejemplo, una regresión lineal tipo a+bx para una serie de puntos que en realidad siguen una estructura a+bx+c^2


# Overfitting / high variance
Una función que se adapta perfectamente a las muestras, pero falla al intentar generalizarse a nuevas muestras  (falla en la predicción)
Suele darse cuando tenenmos muchas features.
Esto puede deberse por una función de alto orden cuando tenemos pocas muestras.

Afecta tanto a regresiones lineales como logísticas.

Posibles soluciones:
  reducir las features:
    - manualmente reducir el número de features
    - model selection algorithm (forma automática para reducir las features)

  regularizar:
    - quedarnos todas las features, pero reducir las magnitud/valores de los parámetros theta
    - funciona bien cuando tenemos muchas features, donde todas ellas contributen a predicir y


## Regularizar
Reducir los parámetros theta.
Gráficamente lo podemos ver como que si reducimos parámtros de theta cerca de cero, estamos anulando componentes, por lo tanto simplificando la función.
Generalizando esta idea, pequeños valores de theta nos dan una hipótesis más simple y por tanto menos propensa a overfitting.

Lo que haremos es añadir un término a nuestra "cost function" para "penalizar" (reducir) todos los theta.

Se añade al final de la cost function: lambda*sum_i=1,m (theta^2)
lambda = regularization parameter
Por convenio no se penaliza a theta_0
Excluir theta_0 quiere decir:
 - que no se suma en el término añadido para calcular la "cost function"
 - que no se suma el nuevo término a la hora de calcular la derivada parcial para theta_0

Se produce una "lucha" en la cost function, donde el primer término intenta adaptarse lo mejor posible a las muestras mientras que el segundo (el nuevo) término intenta reducir los valores de theta.
Si aumentamos theta, aumenta el valor de la "cost function", por lo que el global de la función (donde queremos conseguir un mínimo de la "cost function") no quiere subir mucho theta.

Podemos verlo simulando que ponemos un lambda muy muy alto, lo que provocaría que todos los theta_1,...,theta_n serían cercanos a 0, consiguiendo una línea recta (solo el término theta_0)

Detalles para regresión lineal: regresion.md
Detalles para regresión logística: clasificacion.md
