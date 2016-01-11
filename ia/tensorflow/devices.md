http://www.tensorflow.org/how_tos/using_gpu/index.md

with tf.Session() as sess:
  with tf.device("/gpu:1"):
    matrix1 = tf.constant([[3., 3.]])
    matrix2 = tf.constant([[2.],[2.]])
    product = tf.matmul(matrix1, matrix2)
    ...


Devices are specified with strings. The currently supported devices are:

"/cpu:0": The CPU of your machine.
"/gpu:0": The GPU of your machine, if you have one.
"/gpu:1": The second GPU of your machine, etc.
