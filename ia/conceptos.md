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


# Underfit (high bias) / Overfitting (high variance)
Underfit: un modelo que no se adapta bien, asunciones muy simples.
Overfitting: modelo demasiado adaptado a los datos con lo que lo entrenamos. No generaliza bien
Más en debug.md


## Regularizar
Lograr evitar el overfitting/underfitting
Mirar debug.md



# Skewed classes / valores sesgados
Si tenemos un conjunto de datos muy sesgado, por ejemplo, donde solo el 0.5% de las muestras son "positivas", podríamos tener problemas a la hora de decidir si nuestro algoritmo es bueno.
Si solo usásemos el porcentaje de acierto/error, un algoritmo que siempre diese "negativo", para el caso anterior, tendría una tasa de acierto del 99.5%
Para evitar estos problemas se añaden otros valores para medir la calidad del algoritmo.

En estos casos se suele tomar como notación y=1 para la clase rara que queremos detectar.

True positive: predicho 1, real 1
True negative: predicho 0, real 0
False positive: predicho 1, real 0
False negative: predicho 0, real 1

## Precision
Probabilidad de que una muestra elegida al azar sea relevante.
Alta precisión, bajos falsos positivos. Solo de dispara si está muy seguro.
Ejemplo: no decirle a alguien que está enfermo si no esamos muy seguros
Porcentaje de valores positivos reales sobre el total de predichos positivos.
true_positives / num_predicted_positives = true_positives / (true_pos + false_pos)

## Recall (sensibilidad, exhaustividad)
Probabilidad de que una muestra relevante elegida al azar sea elegida.
Alta sensibilidad, bajos falsos negativos. Se dispara enseguida
Ejemplo: logramos siempre detectar cuando alguien está enfermo
De todos los positivos reales, cuando predecimos como positivos.
num_predicted_positives / num_positives = true_pos / (true_pos + false_neg)
