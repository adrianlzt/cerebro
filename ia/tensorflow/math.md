http://www.tensorflow.org/api_docs/python/math_ops.md

# Cuadrado x^2
tf.square(x, name=None)

# Matrix multiplication
sess.run(tf.matmul(tf.constant([[1,2]]),tf.constant([[3],[4]])))
array([[11]], dtype=int32)

# Media
>>> sess.run(tf.reduce_mean(tf.constant([[1, 2, 3], [5, 6, 7]])))
4
>>> sess.run(tf.reduce_mean(tf.constant([[1, 1, 1], [1, 1, 1]])))
1


Media por columas. Ej.: (1+5)/2:
>>> sess.run(tf.reduce_mean(tf.constant([[1, 2, 3], [5, 6, 7]]),0))
array([3, 4, 5], dtype=int32)


Media por filas:
>>> sess.run(tf.reduce_mean(tf.constant([[1, 2, 3], [5, 6, 7]]),1))
array([2, 6], dtype=int32)

Media para 3 dimesiones:
>>> sess.run(tf.reduce_mean(tf.constant([[[1,2], [2,2]], [[3,2], [4,5]]]),2))
array([[1, 2],
       [2, 4]], dtype=int32)

