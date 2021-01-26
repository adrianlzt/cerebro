Un perceptron tiene N inputs, cada input con cierto peso (el valor de cada input se multiplica por su peso).
Se suman todos los valores, más un bias,
Estos pesos y bias se han decidido en el training

Si el resultado final es superior a un nivel preestablecido, la neurona se activa enviando un output.

El output dependerá de la función de activación.
Puede que solo pueda dar 0/1, o según los valores.
Será una función matemática, que puede ser una función por partes (cierta función para unos valores, otra función para otros valores)

El output será el input de otras neuronas.


# Funciones de activación
https://docs.google.com/presentation/d/1uYSM7hR8H6aNv6hGkzfS05ojQiuVOgnq5ASLpGy8IGk/edit

## Sigmoid
f(x)=1/(1+exp(−x))
Rango entre 0 y 1. Asigna uno para valores de activación altos, 0 para valores de activación bajos. Valores entre 0 y 1 para valores pequeños (al rededor de x=0)
No recomendad como función de activación de hidden layers


## Rectified Linear Unit (ReLU)
f(x) = max(0,x)
Rango entre 0 e infinito.
La mejor función para usar por defecto.



# multi layered perceptron / deep neural network
Uno de los primeros conceptos de redes neuronales (años 60).
Cada "layer" de neuronas está conectada totalmente a la siguiente layer. Cada neurona esta conectada a todas las neuronas de la capa anterior.

Cada layer aprende de la anterior, teniendo un nivel de abstracción más alto.
Típico ejemplo al procesar una foto, la primera capa solo sabe de bordes, líneas, figuras básicas.
La siguiente capa puede interpretar formas complejas, boca, ojos, nariz, orejas.
La siguiente capa ya es capaz de reconocer una cara de una persona determinada.



# Convolutional neural network
Buenas para reconocer imágenes
https://www.youtube.com/watch?v=FmpDIaiMIeA

Son buenas para imágenes porque pueden reconocer correctamente imágenes que están rotadas, escaladas, desplazadas o engrosadas.
Estas redes lo que hacen es dividir la imagen en trozos y hacer match con piezas de la imagen. De esta manera pueden reconocer una imagen rotada, porque reconocerán las distintas partes de la imagen, no la imagen como un todo.



# Long short-term memory network
Buenas para reconocimiento de voz
