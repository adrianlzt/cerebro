#
# Generamos una grafica tipo: y = Ax^2 + B 
# Creamos un vector con 50 puntos random para x (los ordenamos para poder pintar sin problemas)
#
# A TF le decimos que tenemos que resolver la ecuacion. Le definimos las variables b y W que debera encontrar
# El parte con los valores a=7 y b=-1
# Le decimos que debe reducir la distancia entre su calculo (y) y el resultado bueno (y_data)
# Le decimos que use el minimo gradiente para ir acercandose a la funcion
#
# Da 41 vueltas entrenando para mejorar la aproximacion
# Sacamos graficas cada 10 vueltas para ver como se va aproximando la grafica al resultado original
#
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D


A = 2.1
B = 0.3
# Make 100 phony data points in NumPy.
x_data = np.float32(np.random.rand(1, 50)) # Random input
x_data = np.sort(x_data) # Random input
y_data = np.dot(A, np.square(x_data)) + B

# Construct a linear model.
a = tf.Variable(tf.constant([[7.0]]))
b = tf.Variable(tf.constant([-1.0]))
y = tf.matmul(a, np.square(x_data)) + b

# Minimize the squared errors.
loss = tf.reduce_mean(tf.square(y - y_data))
optimizer = tf.train.GradientDescentOptimizer(0.5)
train = optimizer.minimize(loss)

# For initializing the variables.
init = tf.initialize_all_variables()

# Launch the graph
sess = tf.Session()
sess.run(init)

# Fit the plane.
data = []
data.append(sess.run(y))
for step in xrange(0, 41):
    sess.run(train)
    if step % 10 == 0:
        print("step=%s\nA=%s\nB=%s\n" % (step, sess.run(a), sess.run(b)))
        data.append(sess.run(y))

ax = plt.subplot(1,1,1)
plt.plot(x_data[0], y_data[0], label="original", linewidth=2)
plt.plot(x_data[0], data[0][0], label="epoch 0")
plt.plot(x_data[0], data[1][0], label="epoch 10")
plt.plot(x_data[0], data[2][0], label="epoch 20")
plt.plot(x_data[0], data[3][0], label="epoch 30")
plt.plot(x_data[0], data[4][0], label="epoch 40")
plt.legend(loc="upper left", bbox_to_anchor=[0, 1],
           ncol=2, shadow=True, title="Legend", fancybox=True)
plt.show()

print("Final:\nA=%s\nB=%s\n" % (sess.run(a), sess.run(b)))
