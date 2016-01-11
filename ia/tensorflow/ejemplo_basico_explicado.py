#
# Este programa genera aleatoriamente una serie de puntos en dos dimensiones.
# A partir de estos genera la tercera dimension, este valor se calcula a partir de los valores de las otras dimensiones.
#
# Ahora empiezan el ejercicio, se trata de encontrar los valores (w1,w2,b) que resuelvan la ecuación w1*x1 + w2*x2 + b
#

import tensorflow as tf
import numpy as np

# Generamos una serie de puntos en el plano x,z, y luego calculamos y
x_data = np.float32(np.random.rand(2, 100)) # Random input
# Datos del plano x,z. Ejemplo: [ [1,2,3], [4,3,5] ]
# Los parametros significan, 2 dimesiones, 100 puntos en cada una

y_data = np.dot([0.100, 0.200], x_data) + 0.300
# Calculamos cada punto de y como: valorX*0.1 + valorY*0.2 + 0.3
# np.dot es multiplicar, matrices, arrays, etc

# Construimos el modelo linear que debera resolverse para encontrar los valores que definen y_data
b = tf.Variable(tf.zeros([1])) # partimos con b=1
W = tf.Variable(tf.random_uniform([1, 2], -1.0, 1.0)) # partimos con w1 y w2 con valores entre -1 y 1
y = tf.matmul(W, x_data) + b # y = [w1,w2] * x_data + b
# Por cada punto: y(0,0) = w1*x_data(0,0) + w2*x_data(1,0) + b

# Definimos una funcion que TF intentara hacer minima
# Cuando esta funcion tenga su valor minimo habremos llegado a la solucion
# En este caso vamos calculando y con los valores que tenemos de w1,w2 y b
# Restamos los valores originales a nuestro calculo y hacemos el cuadrado (para tener todo valores positivos)
# Calculamos la media de ese valor
# Para conseguir el minimo se usa la tenica del minimo gradiente. Hacemos la derivada y nos acercamos al cruce con cero para buscar un min local
loss = tf.reduce_mean(tf.square(y - y_data))
optimizer = tf.train.GradientDescentOptimizer(0.5)
train = optimizer.minimize(loss)

# For initializing the variables.
init = tf.initialize_all_variables()

# Launch the graph
sess = tf.Session()
sess.run(init)

# Vamos dando vueltas intentando mejorar la aproximacion
for step in xrange(0, 201):
    sess.run(train)
    if step % 20 == 0:
        print step, sess.run(W), sess.run(b)

# Learns best fit is W: [[0.100  0.200]], b: [0.300]
