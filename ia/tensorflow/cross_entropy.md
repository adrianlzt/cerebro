http://www.tensorflow.org/tutorials/mnist/beginners/index.md#training
http://colah.github.io/posts/2015-09-Visual-Information/

Vamos buscando que se fortaleza una de las probabilidades. Que una sea más cercana a 1 y el resto se acerquen a 0.

-SUM(y' * log(y))
y' -> hot-vector. Eg.: [0,0,1,0]
y -> probabilidades. Eg.: [ 0.1, 0.4, 0.4, 0.1 ]

A esta función le estamos pasando unos valores de probabilidad (valores entre 0 y 1).
log(1) = 0
log(0.1) = -2.3

Cuanta menor sea su probabilidad menor será su logaritmo.
Este valor de logaritmo se multiplica por el hot-vector. Esto lo que hace es que para cada pasada del sumatorio solo usemos uno de los logaritmos.


-(log(0.1)+log(0.4)+log(0.4)+log(0.1)) = 6.4
-(log(0.7)+log(0.1)+log(0.1)+log(0.1)) = 7.3
-(log(0.9)+log(0.02)+log(0.05)+log(0.03)) = 10.5
