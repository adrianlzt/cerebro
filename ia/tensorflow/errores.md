ValueError: Shapes TensorShape([Dimension(2)]) and TensorShape([Dimension(None), Dimension(None)]) must have the same rank

Hemos definido los arrays dentro de dobles corchetes?
tf.constant([[1,2]])
tf.constant([[3],[4]])


# failed to create cublas handle: CUBLAS_STATUS_NOT_INITIALIZED
Parece que es un problema con falta de memoria

https://github.com/tensorflow/tensorflow/issues/9489

La única solución que me ha funcionado ha sido añadir:
import tensorflow as tf
from tensorflow.python.keras.backend import set_session

config = tf.compat.v1.ConfigProto()
config.gpu_options.allow_growth = True # dynamically grow the memory used on the GPU
config.log_device_placement = True # to log device placement (on which device the operation ran)
sess = tf.compat.v1.Session(config=config)
set_session(sess)
