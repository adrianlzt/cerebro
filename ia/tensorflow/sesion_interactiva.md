http://www.tensorflow.org/get_started/basic_usage.md#interactive_usage

Nos permite conocer los valores y ejecutar operaciones sin tener que correr la sessión.

sess = tf.InteractiveSession()

.eval() para conocer un valor

.initializer.run() para inicializar las variables




Ejemplo:
import tensorflow as tf
sess = tf.InteractiveSession()
b = tf.constant([1.0, 2.0])
a = tf.constant([3.0, 3.0])
sub = tf.sub(b, a)
print sub.eval()
# ==> [-2. -1.]


Si usamos variables tenemos que iniciarlas:
x = tf.Variable([1.0, 2.0])

# Initialize 'x' using the run() method of its initializer op.
x.initializer.run()
