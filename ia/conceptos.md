# Artificial Intelligence (AI)
Inteligencia humana exhibida por máquinas
Ahora mismo solo existe el "narrow AI". Sistemas que pueden una función, o un conjunto de funciones, mejor que un humano.

# Machine learning
It’s the ability for an algorithm to learn from prior data in order to produce a behavior/find patterns.
Es una aproximación a la AI

Sin ML haríamos un programa con un montón de if-else para crear el algoritmo que necesitamos.
Con ML le pasamos unos datos, le pedimos que los clasifique y luego le decimos que modifique sus parámetros para reducir los errores.

## Supervised Machine Learning
showing the algorithm a data set of situations and telling it what the right decision is (training model)


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
Saber elegir que features necesitamos clasificar para distinguir los elementos de nuestro ML es básico y muchas veces no trivial.
En el reconocimiento de imágenes cada pixel se considera una feature.

Pocas features pueden hacer que no sepamos distinguir los elementos.
Muchas features pueden provocar "overfitting". Esto quiere decir que el sistema reconoce perfectamente el dataset de aprendizaje, pero no puede generalizar.
Ha aprendido exactamente lo que le hemos enseñado, pero los nuevos elementos, como no son iguales a los que ha visto, no sabe categorizarlos.
