http://www.tensorflow.org/api_docs/python/constant_op.md#constant_value_tensors

Para ver el contenido de una variable tendremos que arrancar una Session
http://stackoverflow.com/questions/33633370/how-to-print-the-value-of-a-tensor-object-in-tensorflow

# Tipos
http://www.tensorflow.org/resources/dims_types.md


# Constantes
c = tf.constant(4.0)
sess = tf.Session()
sess.run(c)
4.0


>>> sess.run(tf.constant([[1, 2, 3], [5, 6, 7]]))
array([[1, 2, 3],
       [5, 6, 7]], dtype=int32)


# Variables
http://www.tensorflow.org/how_tos/variables/index.md

Variables maintain state across executions of the graph.

var = tf.Variable(0, name="counter")

Es necesario inicializarlas:
init_op = tf.initialize_all_variables()
sess.run(init_op)


# Placeholder / feeds
http://www.tensorflow.org/get_started/basic_usage.md#feeds

Es una input para la sesión.
Ahí pondremos los datos que carguemos de otro lado.

En el run pasaremos los valores. Ej.:
  sess.run(train_step, feed_dict={x: batch_xs, y_: batch_ys})

Con feed_dict podemos modificar el valor de cualquier tensor, no solamente de los placeholders.


# Convertir
>>> sess.run(tf.cast(tf.constant([[1, 2, 3, 5, 6, 3]]),"float"))
array([[ 1.,  2.,  3.,  5.,  6.,  3.]], dtype=float32)

>>> sess.run(tf.cast(tf.constant([[True, False, False]]),"float"))
array([[ 1.,  0.,  0.]], dtype=float32)



# Tensores
mirar conceptos.md
