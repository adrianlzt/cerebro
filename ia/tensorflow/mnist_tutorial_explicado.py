import input_data
mnist = input_data.read_data_sets('MNIST_data', one_hot=True)

import tensorflow as tf
sess = tf.InteractiveSession()

# Definimos los inputs que rellenaremos con datos despues
x = tf.placeholder("float", shape=[None, 784])
y_ = tf.placeholder("float", shape=[None, 10])

# Definimos las variables que se iran modificando para llegar al modelo esperado
W = tf.Variable(tf.zeros([784,10]))
b = tf.Variable(tf.zeros([10]))

# Inicializamos las variables (pensar como en C, que hace falta inicializarlas)
sess.run(tf.initialize_all_variables())

# Definimos nuestro "regression model"
# Cada pixel de cada imagen (cada imagen es una fila de x) se multiplica por cada una de las columnas de W
# Cada columna de W es el "detector" de un numero
# En la matriz resultante, en la primera fila, tendremos para la primera imagen el peso de que pueda ser del tipo 1, tipo 2, etc
# Luego se suma el "bias" b, lo que hace es dar mas peso a ciertos tipos (porque, por ejemplo, es mas probable que salga el tipo 3 que el resto)
# Al aplicar softmax normalizamos los valores para cada imagen (fila).
# Cada imagen tendra una probabilidad de serl del tipo1, otra del tipo2, etc
y = tf.nn.softmax(tf.matmul(x,W) + b)

# Definimos la "cost function"
# Esta es la funcion que TF intentara reducir, significando que nos estamos acercando a la correcion
# En este caso se pasan las probabilidades por el logaritmo en base 10
# Esto hace que cuanta menor sea la probabilidad obtendremos un numero mas negativo
# log(1)=0   log(0.5)=-0.3  i log(0.2)=-0.7   log(0.05)=-1.3
# y_ es un one-hot vector, quiere decir que tiene todos sus elementos a 0 menos uno que vale 1 (Ej.: [0,0,0,1,0]
# La multiplicion en este caso no es matricial, simplemente es multiplicar el elemento (i,j) de una matriz por el (i,j) de la otra
# y_ es resultado correcto del analisis. Por ejemplo, si la primera fila es [0,0,1,0,0] quiere decir que la primera imagen es del tipo 3
# Con esta multiplicacion lo que hacemos es ver las probabilidades que hemos dado para el numero que era de verdad.
# Ej.: Si estamos intentando encontrar un numero del 1 al 5, y la primera imagen era un 4
# nos quedamos con la probabilidad que hemos dado nosotros de que la primera imagen era efectivamente un 4
# Luego sumamos todos los elementos de la matriz
# Como dijimos antes, una buena probabilidad (cercana a 1) hace que el logaritmo tenga un valor negativo cercano a 0
# La suma de todos los elementos siempre tiene que ser menor de 0, por eso ponemos el signo negativo.
# Al final nos queda un numero positivo, que cuanto mas alto indica que peor es nuestra aproximacion.
#
# Si nuestras estimaciones han sido bastantes buenas, tendremos probabilidades cercanas al 1.
# Al hacer el logaritmo se nos quedaran unos numeros negativos pequenos
# Tras sumarlos tendremos un numero negativo pequeno, y al invertirlo tendremos un numero positivo pequeno.
# Esto es lo que queremos conseguir
cross_entropy = -tf.reduce_sum(y_*tf.log(y))

# Ahora usaremos el metodo del minimo gradiente para minimizar la funcion anterior
# Este sistema se basa en hacer la primera derivada e irnos acercando al 0 en pasos de 0.01
# El corte de la primera derivada nos dira que estamos en un minimo (o maximo) relativo (con la segunda derivada sabremos que estamos en un min)
# La funcion cross_entropy siempre es positiva, asi que si estamos en un minimo significa que cross_entropy tiene el valor mas cercano a 0 posible
#
# Esta linea anade operaciones al grafo: calculo del gradiente, calculo de los steps aplicados a las variables y actualizaciones de las variables
train_step = tf.train.GradientDescentOptimizer(0.01).minimize(cross_entropy)

# Por ultimo durante 1000 veces vamos entrenando a nuestro sistema para que vaya reduciendo cross_entropy
# Esto implica que ira modificando los valores de W y b para que cada vez acierte mas
# Cada vuelta se entrenara con un conjunto de 50 imagenes nuevas
for i in range(1000):
    batch = mnist.train.next_batch(50)
    train_step.run(feed_dict={x: batch[0], y_: batch[1]})


# Por ultimo vamos a evaluar cuan bueno es nuestro modelo
# Argmax nos da la posicion del elemento de mayor valor.
# Para y nos dara el elemento que la red piensa que ha visto
# Para y_ nos dara el elemento que realmente era
# Como y e y_ van a ser matrices de (Mx768) (M=numero de imagenes) (768=pixeles de cada imagen)
# argmax nos devolvera un array con el indice del elemento de mayor valor por cada fila.
# tf.equal() nos devuelve un array de tamano y con True o False, dependiendo si el valor era igual o no.
# Al final tendremos un array tipo [True, False, False, True, True, ...] uno elemento por cada imagen.
# True significara que hemos acertado con la prediccion
correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))

# Para poder sacar un numero de lo bien que nos ha ido, se convierten esos boolean en 1 o 0 y luego se haya la media.
accuracy = tf.reduce_mean(tf.cast(correct_prediction, "float"))

# Las dos lineas anteriores solo han metido operaciones en el grafo, no han hecho nada, aun
# Aqui es cuando ejecutamos la evaluacion, pasando en x un conunto de imagenes que la red no ha visto aun, y en y_ los valores correctos
print accuracy.eval(feed_dict={x: mnist.test.images, y_: mnist.test.labels})

sess.close()
