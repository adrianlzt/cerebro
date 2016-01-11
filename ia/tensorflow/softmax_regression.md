http://www.tensorflow.org/tutorials/mnist/beginners/index.md#softmax_regressions
http://neuralnetworksanddeeplearning.com/chap3.html#softmax

y=softmax(evidence)

>>> sess = tf.InteractiveSession()
>>> tf.nn.softmax([[1., 4., 5.],[9., 0., 1.]]).eval()
array([[  1.32128876e-02,   2.65387952e-01,   7.21399188e-01],
       [  9.99541402e-01,   1.23353209e-04,   3.35308781e-04]], dtype=float32)

Por cada fila normaliza los valores. La suma de todos da 1


>>> tf.nn.softmax([[1., 1., 2.]]).eval()
array([[ 0.21194156,  0.21194156,  0.57611686]], dtype=float32)

Aqui vemos que la probabilidad del tercer elemento es 57%, respecto a los otros dos que es un 21%




