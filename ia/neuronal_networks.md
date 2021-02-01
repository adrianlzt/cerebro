# Perceptrón
Un perceptron tiene N inputs, cada input con cierto peso (el valor de cada input se multiplica por su peso).
Se suman todos los valores, más un bias (se suele poner como x_0),
Estos pesos y bias se han decidido en el training

Los pesos (weights) son los parámetros del modelo (sería el vector theta en regresión logística)

Si el resultado final es superior a un nivel preestablecido, la neurona se activa enviando un output.

El output dependerá de la función de activación.
Puede que solo pueda dar 0/1, o según los valores.
Será una función matemática, que puede ser una función por partes (cierta función para unos valores, otra función para otros valores)

El output será el input de otras neuronas.


## Funciones de activación
https://docs.google.com/presentation/d/1uYSM7hR8H6aNv6hGkzfS05ojQiuVOgnq5ASLpGy8IGk/edit

Será la función que decida el valor de salida de la neurona.
Podemos ver cada neurona como un problema de regresión logística.


### Sigmoid
f(x)=1/(1+exp(−x))
Rango entre 0 y 1. Asigna uno para valores de activación altos, 0 para valores de activación bajos. Valores entre 0 y 1 para valores pequeños (al rededor de x=0)
No recomendad como función de activación de hidden layers


### Rectified Linear Unit (ReLU)
f(x) = max(0,x)
Rango entre 0 e infinito.
La mejor función para usar por defecto.



# neuronal network (NN) / multi layered perceptron / deep neural network
Uno de los primeros conceptos de redes neuronales (años 60).
Cada "layer" de neuronas está conectada totalmente a la siguiente layer. Cada neurona esta conectada a todas las neuronas de la capa anterior.

La primera layer será la "input layer".
La última, "output layer"
En medio, las "hidden layer"

Las neuronas de capas intermedias (hidden layers) y las de salida también tendrán como entrada la "bias unit" (la x_0 que coméntaba al principio).

Cada layer aprende de la anterior, teniendo un nivel de abstracción más alto.
Típico ejemplo al procesar una foto, la primera capa solo sabe de bordes, líneas, figuras básicas.
La siguiente capa puede interpretar formas complejas, boca, ojos, nariz, orejas.
La siguiente capa ya es capaz de reconocer una cara de una persona determinada.

Podemos entender que gracías a las capas intermedias estamos modificando nuestras features iniciales de formas no líneales hasta llegar a la output layer donde tomará la decisión, con unas features modificadas adaptadas para tener una mejor respuesta.



## network architectures
Se refiere a como organizamos las neuronas, cuantas capas, cuantas neuronas en cada capa, como se conectan, etc.
L = número de layers, contando input y output
s_l = número de unidades (sin bias) en la layer "l"
K = número de output units

Jugando con una red de un layer de dos neuronas + neurona bias, es fácile crear las puertas lógicas: AND, XOR, OR, etc
Por ejemplo, siendo los pesos de la bias, neurona1 y neurona2:
x1 AND x2 = (-30,20,20)
x1 OR x2 = (-10,20,20)
(NOT x1) AND (NOT x2) = (10,-20,-20)

Para XOR,XNOR necesitaremos dos layers con dos neuronas (+bias)

Esto nos da la intuación de que con NN podemos lograr computaciones complejas, ya que al final estamos montando una suerte de circuito lógico.


## Sintaxis
x_i^j (x subscript i, superscript j), será el resultado de la neurona i (i=0 es bias unit) en la capa j (j=2 será la input layer)
theta^j, matriz de los pesos que conectan la capa j con la capa j+1 (conexiones entre las disintas neuronas)
Esta matriz tendrá dimensiones s_(j+1) x (s_j +1) (rows = número de neuronas en la capa j+1, columns=uno + número de neuronas de la capa j, por la bias unit)

Para una red neuronal de 3x3x1, a_1^2 = g(theta_10^1 * x_0 + theta_11^1 * x_1 + theta_12^1 * x_2 + theta_13^1 * x_3)
  thetha_10^1, posición row=1,column=0 de la matriz theta^1
  a_1^2 es la neurona 1 de la layer 2

Podemos reescribirlo como: a_1^2 = g(z_1^2)
Si queremos poner una layer entera: a^2 = g(z^2) = g(theta^1*a^1)
  faltaría añadir a_0^2=1 (bias unit)

Esta formulación es la implementación vectorizada del "forward propagation", que es como calcular la salida a partir de los valores de entrada.


## Classification

### Binary classification
K=1, solo una unit en la capa output

### Multiclass classification
Para poder diferenciar N grupos, necesitaremos N neuronas en la output layer.
Cada neurona de la capa de salida también tendrá su bias unit.

En esta última capa se activará únicamente una neurona para cada set de datos de entrada.

Lo usaremos para K>=3 (para K=2 podríamos usar binary, jugando con activo no activo)

### Cost function
Usamos una generalización de la usada en logistic regression.
Ahora añadimos un sumatorio para contemplar las salidas de todas las units de la output layer, para que la cost function tenga en cuenta que el valor de cada output unit sea lo más cercano a la salida y (la salida conocida en el entrenamiento)

En el término de regularización se suman todos los valores de la matriz theta, sin contar los términos de las bias unit (los THETA_i_0^l, el subscript j=0 son los asociados a las bias unit).

https://gist.github.com/adrianlzt/ba2b668254f46bb9364c0eb1ab04584c
En TeX:
\begin{gather*} J(\Theta) = - \frac{1}{m} \sum_{i=1}^m \sum_{k=1}^K \left[y^{(i)}_k \log ((h_\Theta (x^{(i)}))_k) + (1 - y^{(i)}_k)\log (1 - (h_\Theta(x^{(i)}))_k)\right] + \frac{\lambda}{2m}\sum_{l=1}^{L-1} \sum_{i=1}^{s_l} \sum_{j=1}^{s_{l+1}} ( \Theta_{j,i}^{(l)})^2\end{gather*}



# Convolutional neural network
Buenas para reconocer imágenes
https://www.youtube.com/watch?v=FmpDIaiMIeA

Son buenas para imágenes porque pueden reconocer correctamente imágenes que están rotadas, escaladas, desplazadas o engrosadas.
Estas redes lo que hacen es dividir la imagen en trozos y hacer match con piezas de la imagen. De esta manera pueden reconocer una imagen rotada, porque reconocerán las distintas partes de la imagen, no la imagen como un todo.



# Long short-term memory network
Buenas para reconocimiento de voz
