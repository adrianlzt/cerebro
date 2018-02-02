Una vez elegido el modelo deberemos hacerle el training.

Iremos usando nuestro training set para ajustar las matrices de "weights" y "biases" para reducir el error que comete el modelo.
Al comienzo tendremos esas matrices inicializadas con valores aleatorios.

Hay otros "hyperparameters" que podemos configurar en el training. Por ejemplo, el número de veces que enseñaremos la training data al modelo y cuando modificaremos los weights y biases en cada train step.


# Supervised learning (área más estudiada)
El training set está "labeled". Le estamos diciendo al modelo para cada features, cual es la respuesta correcta.


# Unsupervised learning
Le pasamos al modelo una serie da datos no labeled.
El modelo debe ser capaz de distinguir que features hacen distintos los grupos.
Puede ser tricky, porque tal vez ni si quiera sabemos el número de grupos en el que hace falta separar los datos.


# Reinforcement learning
Aprendiendo usando prueba-error mediante recompensa o castigo.
Caso típico, un juego. Cada punto que gane el modelo será una recompensa.
El modelo aprenderá a maximizar la recompensa sin que sea necesario explicarle las reglas del juego.
Se repite el "juego" millones de veces para aprender a como mejorar la recompensa.
