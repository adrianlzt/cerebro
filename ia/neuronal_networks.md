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

### Elegir la arquitectura
El número de units en la input layer será el número de features
El número de units en la output layer será el número de clases en las que queremos agrupar.

Por defecto se suele usar una única hidden layer. Si añadimos más, normalmente usaremos en todas el mismo número de units.
En general, cuantas más units tenga la hidden layer, mejor. Suele variar entre el mismo número que la input layer y 4 veces esa cantidad.



## Sintaxis
x_i^j (x subscript i, superscript j), será el resultado de la neurona i (i=0 es bias unit) en la capa j (j=2 será la input layer)

Θ^j, matriz de los pesos que conectan la capa j con la capa j+1 (conexiones entre las disintas neuronas)
Esta matriz tendrá dimensiones s_(j+1) x (s_j +1) (rows = número de neuronas en la capa j+1, columns=uno + número de neuronas de la capa j, por la bias unit)

aⁿ serán los valores de activación de las neuronas de la capa n
a¹ serán los valores de entrada (x)
zⁿ serán los valores de entrada a las units (salidas de la activación anterior multiplicadas por los pesos)
z² será Θ¹ * a¹ (valores numéricos  negativos y positivos que al pasar por la función sigmoide se convertirán en valores entre 0 y 1. Los valores negativos se convertirán a ~= 0 y los positivos a ~=1)

Para una red neuronal de 3x3x1, a_1^2 = g(Θ_10^1 * x_0 + Θ_11^1 * x_1 + Θ_12^1 * x_2 + Θ_13^1 * x_3)
  thetha_10^1, posición row=1,column=0 de la matriz Θ^1
  a_1^2 es la neurona 1 de la layer 2

Podemos reescribirlo como: a_1^2 = g(z_1^2)
Si queremos poner una layer entera: a^2 = g(z^2) = g(Θ^1*a^1)
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

En el término de regularización se suman todos los valores de la matriz Θ, sin contar los términos de las bias unit (los Θ_i_0^l, el subscript j=0 son los asociados a las bias unit).

https://gist.github.com/adrianlzt/ba2b668254f46bb9364c0eb1ab04584c
En TeX:
\begin{gather*} J(\Theta) = - \frac{1}{m} \sum_{i=1}^m \sum_{k=1}^K \left[y^{(i)}_k \log ((h_\Theta (x^{(i)}))_k) + (1 - y^{(i)}_k)\log (1 - (h_\Theta(x^{(i)}))_k)\right] + \frac{\lambda}{2m}\sum_{l=1}^{L-1} \sum_{i=1}^{s_l} \sum_{j=1}^{s_{l+1}} ( \Theta_{j,i}^{(l)})^2\end{gather*}

A modo intuitivo, para cada muestra de entrenamiento, si descartamos la regularización, podemos pensar que la cost function es la distancia (como en regresión lineal):
(h(x) - y)^2


### Backpropagation Algorithm
Algoritmo para reducir la cost function de NN. El nombre viene de que vamos calculando el error al final de la red y a partir de ese valor vamos moviéndonos hacia el comienzo de la red.
Para poder usar una función que nos busque el mínimo tenemos que pasarle la cost function (sencilla de calcular) y las derivadas parciales respecto a cada término de la matriz Θ

Definimos δ_j^l como el error del nodo j en la capa l.
Por ejemplo, para una red L=4, el error de la neurona "j" de salida sería:
δ_j_4 = a_j^4 - y_j
  el valor de su activación (hipótesis) menos el valor real del training set

En forma vectorizada:
δ^4 = a^4 - y

Para esa misma red L=4, los otros valores de δ serían:
δ^3 = (Θ^3)^T * δ^4 .* g'(z^3)
δ^2 = (Θ^2)^T * δ^3 .* g'(z^2)

Para δ^n = la matriz Θ^n (matriz de pesos que conecta la capa n con n+1) transpuesta multiplicada por el error de la capa siguiente, product-wise (multiplicando elemento a elemento) por la derivada de la función de activación (g) para los valores z^3.

g'(z^3) = a^3 .* (1-a^3)
  siendo "1" la matriz de unos

Si ignoramos el término de regularización (alpha=0), matemáticamente se puede demostrar que las derivadas parciales de la cost function son:
d J(Θ) / d Θ_ij^l = a_j^l * δ_i^(l+1)


Implementando el algoritmo para m muestras tendríamos que hacer:
  inicializar Δ_ij^l = 0 (para todos los valores i,j,l)
    i=muestra del training set que estamos usando
    j=número de la neurona
    l=número de capa

  iterar por el training set: i=1 hasta m
    seteamos los valores de entrada: a^1 = x^i  (valores de entrada del training set i)
    hacemos el algoritmo de forward propagation para las distintas capas
    con el resultado del training set (y^i), calculamos las δ de la output layer: δ^L = a^L - y^i
    calculamos las deltas de las capas anteriores
      para una única hidden layer tendríamos: δ² = (Θ²)ᵗ * δ³ .* g'(z²)
        tenemos que haber quitado δ₀, la de la bias unit
    vamos acumulando los errores en Δ_ij^l = Δ_ij^l + a_j^l * δᵢ^(l+1)
      matemáticamente se puede demostrar que así estamos calculando ∂J/∂Θ
      los subíndices i y j son las posiciones fila/columna de la matriz Θ
    en forma vectorial: Δ^l = Δ^l + δ^(l+1) * (a^l)ᵗ

  Una vez hemos terminado el loop tenemos:
    D_ij^l = (1/m) * Δ_ij^l + alpha * Θ_ij^l    cuando j!=0
    D_ij^l = (1/m) * Δ_ij^l                     cuando j=0 (para las bias unit)

  Y una demostración matemática comleja nos afirma que, las derivadas parciales respecto a Θ_ij^l son esos términos D_ij^l
  ∂J/∂Θ_ij^l = D_ij^l


#### Gradient checking
Para comprobar que se ha implementado correctamente el algoritmo de back propagation se puede usar "gradient checking", una aproximación al cálculo del gradiente para comprobar que el valor que estamos cálculando "tiene sentido".
Este cálculo se hace obteniendo la pendiente de J (cost function) para dos valores muy cercanos (se suele usar +-10⁻⁴).
Lo haremos para cada valor de θᵢ
Solo lo haremos cuando estemos comprobando el algoritmo (lo haremos con una red neuronal pequeña), luego lo borraremos, ya que es muy costoso.

En octave sería:
epsilon = 1e-4;
for i = 1:n,
  thetaPlus = theta;
  thetaPlus(i) += epsilon;
  thetaMinus = theta;
  thetaMinus(i) -= epsilon;
  gradApprox(i) = (J(thetaPlus) - J(thetaMinus))/(2*epsilon)
end;


#### Random initialization
Si inicializamos theta con todo valores a 0, cuando se realiza el BP, todos los nodos se actualizan con el mismo valor, por lo que solo conseguimos que la NN se adapte a una única feature.
Lo que haremos es asignar los valores de Θ de manera random.
Generalmente asignaremos esos valores en un rango [-ε, ε]

Ese valor ε lo podemos elegir como: √6/√(Lᵢ + Lₒ), siendo Lᵢ la capa de entrada para el Θ que estemos calculando y Lₒ la capa de salida.



## Traning
1. Inicializar Θ aleatóriamente
2. Implementar el algoritmo forward propagation, para obtener h_θ(xⁱ) para cada xⁱ
3. Implementar el código para calcular la cost function J(Θ)
4. Implementar el algorimo de back propagation para calcular las derivadas parciales dJ(Θ)/dΘ^l_kj
   Interar por cada uno de los training samples, haciendo el fwd prop y backprop. Obteniendo las activaciones a^l y los δ^l para las distintas capas, acumulado en los términos Δ (así tendremos las derivadas parciales)
5. Comprobar con gradient checking que las derivadas parciales del anterior punto están bien
6. Usar algún método para encontrar el mínimo de J(Θ) (gradient descent u otros)
   J(Θ) no es convexa, por lo que podría suceder que no encontremos el mínimo global, pero en la práctica los algoritmos encuentran un valor muy bueno.



# Convolutional neural network
Buenas para reconocer imágenes
https://www.youtube.com/watch?v=FmpDIaiMIeA

Son buenas para imágenes porque pueden reconocer correctamente imágenes que están rotadas, escaladas, desplazadas o engrosadas.
Estas redes lo que hacen es dividir la imagen en trozos y hacer match con piezas de la imagen. De esta manera pueden reconocer una imagen rotada, porque reconocerán las distintas partes de la imagen, no la imagen como un todo.



# Long short-term memory network
Buenas para reconocimiento de voz
