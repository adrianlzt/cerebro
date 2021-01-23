Para solucionar el problema de regresión definiremos una "cost function".
Para una regresión lineal típicamente usaremos "Squared error function" o "Mean squared error" (suma de las distancias de los puntos a nuestra recta, al cuadrado para que siempre sea positivo) para determinar si nuestra hipótesis es la mejor.

Cost function: (1/2m)sum_i=1_m((h(x_i)-y_i)^2)
Para cada muestra, calculamos la distancia entre el valor de nuestra hipotesis, h(x_i), y el valor real (y_i). Este valor lo elevamos al cuadrado (para solo tener números positivos.
Hacemos el sumatorio de todas las muestras y por último dividimos entre m (para tener una especie de meida) y entre 2 (útil para resolver la ecuación).

Cost function multivariable en formato vectorial:
J = ((X*theta - y)' * (X*theta - y))/(2*m);


Luego lo que querremos hacer es reducir el valor de esa función, es decir, encontrar los parámetros "a" y "b" que reducen la cost function.
Para esto usaremos descenso del gradiente (gradient descent)

La hipótesis más básica es: y = theta_0 + theta_1*x = theta' * x (esto último es el vector theta (theta_0; theta_1) transpuesto multiplicando a al vector x.
Para poder hacer esto tenemos que añadir una columna de unos a x, si no tendremos dos vectores que no se pueden multiplicar (dimensiones no compatibles).
Ejemplo prácico, si nos dan una lista de tamaños de casas (x) y precios (y) y queremos usar la hipótesis: y = theta_0 + theta_1*x, si queremos poner esto en matriz:
y = theta' * x
Para que esto pueda funcionar, x tiene que tener una primera columna de unos que multiplique a theta_0

#### Combinar features
Podemos crear nuevas features combinando las features originales.
Por ejemplo, podríamos tener como feature el ancho y largo de una parcela. Podemos combinar esas dos features multiplicándolas x_3 = x_1 * x_2
Pero en este caso una regresión lineal no va a cuadrar.

#### Polynomial regression
También podemos crear regresiones usando otros tipos de polinomios como hipótesis:
y=ax^2+bx+c
y=ax^3+bx^2+cx+d
y=a*sqrt(x)+bx+c
etc

Cuando usamos x^2, x^3 adaptar bien los parámetros es crucial, para que no sean demasiado grandes ni demasiado pequeños.
Mirar "Acelerar el gradient descent"

Existen algoritmos para ayudarnos a elegir la mejor forma.



#### Gradient descent
https://www.coursera.org/learn/machine-learning/supplement/U90DX/gradient-descent-for-linear-regression

Algoritmo para encontrar un mínimo local. También le suelen llamar "batch gradient descent", por el hecho de que vamos sumando todos los términos cada vez.
Gráficamente, para dos parámetros, lo podemos ver como un terreno (x e y es la superficie, y el resultado de la función la altura).
Puestos en un lugar aleatorio, el algoritmo nos encontrará un mínimo local.
Esto lo hace bajando siempre por la pendiente más inclinada. Vamos restando a cada coordenada el valor de su derivada multiplicado por un "learning rate".
El valor de este "learning rate" definirá como de "grandes" daremos los pasos. Muy pequeño y tardaremos mucho, muy grande y puede que no encontremos el mínimo o incluso que diverjamos y nos alejemos de ese mínimo. Para saber si hemos puesto un "learing rate" muy grande podemos monitorizar si el valor de la cost function crece en algún paso, esto nos indicaría que hemos empezado a diverger.
Otra cosa que deberemos hacer es definir cuando decicimos que hemos llegado al mínimo local, ya que tal vez llegar al valor donde la derivada es 0 lleva muchos steps, pero llegar a un valor con un error menor a 0.001 es mucho más rápido. En práctica es dificil elegir este valor (0.001) que consideramos válido como aproximación.

Para obtener la pendiente hacemos la derivada parcial para cada theta_i para la cost function:
(1/2m)sum_i=1_m((h(x_i)-y_i)^2)
Nos queda:
(h(x)-y)*x_i
Para ir variando el valor de cada theta haremos (siendo x_i la columna de X asociada a cada theta, que para theta_0 la habremos forzado a 1 siempre):
theta_i = theta_i - (alpha/m)*sum_i=1,m((h(x)-y)*x_i)

Versión multivariable vectorial:
theta = theta - (alpha * (((theta' * X')' - y)' * X) / m)';


Para el caso de regresiones lineales, la forma de la superficie es una superficie convexa, por lo que solo hay un mínimo absoluto.

Para representar gráficamente en 2D se usan isolineas (contour lines), líneas que tienen el mismo valor de la función. Las típicas curvas de nivel de los mapas.
Para la regresión lineal serán, aproximadamente, círculos que se van cerrando cada vez más en torno a un punto, ese punto será el mínimo global.

También podemos tener que calcular la regresión lineal multivariable, tipo:
y = ax_1 + bx_2 + bx_3 + cx_3
Simplemente tendremo que realizar la misma operación de "bajar por la pendiente máxima" por cada variable.

##### Acelerar el gradient descent
Para acelerar el proceso de encontrar el mínimo local usaremos dos técnicas: feature scaling y mean normalization.
Feature scaling es conseguir que el rango de cada variable sea aproximadamente entre [-1,1], de esta manera tendremos isolíneas más circulares (menos ovaladas) que nos llevarán al mínimo más rápidamente.
Ejemplo, si una de nuestras variables es el precio de una cosa, que varía entre 100 y 1000, quremos reducir ese margen para que se acerque más a [-1,1].
Lo que haremos es dividir los valores entre su desviación estandar (no meterá los valores estrícamente en el rango [-1,1], pero se acercará).
Igualmente si los valores son muy pequeños, por ejemplo [-0.00001, 0.00001], este rango estará alejado de [-1,1], por lo que también lo dividiremos por su std para acercarnos a [-1,1]

Como regla tonta, esperamos que nuestros valores estén en el rango -3/3 -0.3/0.3

Otra operación que podemos hacer para acercarnos más al margen, es primero restar la media de los valores:
x_nuevo = (x_viejo - media) / std

De esta manera tendremos los valores centrados al rededor del punto 0.
Ejemplo, en vez de tener [0.52270837, 0.65338547, 1.04541675, 2.61354187, 2.87489605]
tendríamos: [-1.01928133, -0.88860423, -0.49657295,  1.07155217,  1.33290635]

Cuando calculemos la media y la std las guardaremos, porque si luego queremos generar un valor a partir de nuestra hipótesis, tendremos que aplicarle también esas normalizaciones.
Ejemplo, si hemos entrenado nuestro modelo con una serie de datos normalizados, cuando queramos usar ese modelo "de verdad", por ejemplo, pasándole el tamaño de un terreno para conocer su precio, tendremos que primero convertir ese tamaño a su valor normalizado.



#### Normal equation
Es otra forma de encontrar el mínimo de la función.
Haremos la derivada de la función y la resolveremos tras igualarla a 0 (gráficamente, encontramos cuando la pendiente es 0).

Matemáticamente se puede demostrar que, para varios parámetros de entrada, la solución es:
Theta = (X^T * X)^-1 * X^T * y
En formato octave:
Theta = (X'*X)^-1 * X'*y

La matriz X tendrá una primera columna todo 1's ("intercept term") y luego el esto de columnas serán los parámetros (features).
"y" será el vector de los resultados.

Podemos tener el caso de que la matriz X^T*X no sea invertible, pero si usamos algún programa de cálculo, generalmente nos devolverá igualmente el resultado, haciendo uso de la pseudo-inversa.
De todas maneras, que no sea invertible vendrá por alguna de estas razones:
 - feature redudantes (dependientes linearmente): por ejemplo, usar el area en m^2 y en pies^2
 - demasiadas features: iguales o más que el número de training samples (n>=m). Tendremos que borrar algunas featues o usar "regularization"

Comparación con gradient descent:
Para esta solución el feature scaling nos da igual.
Es mejor también porque no tenemos que iterar ni tenemos que elegir un "learning rate"
A cambio, calcular la inversa de X^T*X es costoso, digamos que funciona hasta n de orden 1000. 10^4 ya tal vez nos obligaría a usar gradient descent (complejidad de cálculo O(n^3))



# Regularización
Teoría en regularizacion.md


Cost function con regularización
(1/2m)*( sum_i=1_m((h(x_i)-y_i)^2) + landa * sum_i=1,n(theta_j^2))

## Gradient descent
Si ahora escribimos el gradient descent (excepto para theta_0, que se queda sin el nuevo componente):
theta_i = theta_i - (alpha/m)*(sum_i=1,m((h(x)-y)*x_i) + (landa*theta_j/m))
  vuelve a ser el cálculo de la derivada parcial

Podemos reescribir esa función como:
theta_j = theta_j(1- alpha*landa/m) - (alpha/m) * sum_i=1_m((h(x_i)-y_i)^2)

(1- alpha*landa/m) < 1 (si alpha y landa son >0, se da obligatoriamente que todo es <1), normalmente cercano a 1
Esto nos ayuda a ver gráficamente que lo que está haciendo es reducir un poco el parámetro theta y luego haciendo el gradient desecent.


## Normal function
Theta = (X'*X + landa * K)^-1 * X'*y
  k es la matriz identidad pero con k(0,0)=0


En el caso de que no había invertibilidad (cuando tenemos más features que samples), con la normalización si evitamos este caso, consiguiendo que siempre sea invertible.
