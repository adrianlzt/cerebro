https://towardsdatascience.com/a-mathematical-introduction-to-word2vec-model-4cf0e8ba2b9

@alberto:
como funciona, es que realmente una buena parte del vector resultante del embedding proviene de la probabilidad de que una palabra aparezca al lado de otra, es decir, que realmente si entrenamos con palabras sueltas, no va a funcionar igual de bien que si se entrena con frases. Porque basicamente, durante el entrenamiento, se tiene en cuenta la frecuencia con la que una palabra aparece junto a otra.


Cuidado con usar modelos distintos de word2vec en el entrenamiento y en el uso final (o predicción o test).
Si el corpus es distinto, estará generando cosas distintas.
