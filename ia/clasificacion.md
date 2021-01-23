En este caso queremos organizar los inputs en un número finito de grupos.
Por ejemplo, en el caso binario de clasificación, podríamos tener el tamaño de un tumor y querer saber si es maligno o benigno.

En un caso con una simple feature, lo que queremos es un corte vertical que nos separe los grupos.
Intentar solventar estos problemas con regresión lineal nos dará muy malos resultados, ya que en la zona cercana a donde debería estar ese corte vertical no quedará claro que valores son de cada grupo. Y también porque la recta se estará adaptando para reducir el coste, cuando lo que buscamos es otra cosa. La regresión lineal también nos dará valores muy grandes y muy pequeños, cuando nosotros solo buscamos 0 o 1 (para el caso binario)


Para solventar estos problemas (clasificación binaria) usaremos la regresión logística.
Usaremos la función logística (o sigmoide):
g(z) = 1/(1+e^-z)

Esta función nos da:
  0 para valores -inf
  1 para valores +inf
  transición entre 0 y 1 en su paso por z=0

z=ax+b
  modificando "a" obtendremos una transición más brusca (a>1) o más suave (a<1)
  modificando "b" desplazaremos el corte hacia la derecha (b>0) o izquierda (b<0)

Para varias feature lo definimos como:
z=theta*x


El resultado de la hipótesis que obtengamos para un valor nuevo se deberá interpretar como la probabilidad de que el resultado pertenezca al grupo "1".

Escrito con notación estadística:
h(x) = p(y=1 | x; theta)
  probabilidad de que y=1, dado el input x y parametrizado por theta

p(y=0 | x; theta) + p(y=1 | x; theta) = 1
p(y=0 | x; theta) = 1 - p(y=1 | x; theta)


# Decision boundary
A partir de la gráfica de g(z) = 1/(1+e^-z) vemos que el cambio de 0 a 1 se hace en z=0, y=0.5
Por tanto podemos decir que el "grupo" 0 se dará para valores z<0 y el grupo "1" para z>0

Si por ejemplo tenemos dos features nuestra función hipótesis sería:
h(x) = g(z) = g(theta_0 + theta_1*x_1 + theta_2*x_2)

Por lo tanto, el grupo "0" es cuando: theta_0 + theta_1*x_1 + theta_2*x_2 < 0
Por lo tanto, el grupo "1" es cuando: theta_0 + theta_1*x_1 + theta_2*x_2 > 0

Para este caso con dos features, podemos dibujar una gráfica con los ejes x_1 en abscisas y x_2 en ordenadas.
x_2 = -(theta_1/theta_2)*x - theta_0/theta_2
Esta línea será la que separe que valores (x_1, x_2) se consideran de un grupo u otro.
Esta línea se llama "decision boundary" (que son los valores x que obtienen el valor h(x)=0.5)


# Non-linear decision boundaries / feature mapping
Podemos usar funciones "z" más complejas (polinómios de más orden) para definir otros tipos de límites.

Por ejemplo: g(t0 + t1*x1 + t2*x2 + t3*x1^2 + t4*x2*2), para el caso t = [-1, 0, 0, 1, 1] nos dá la fórmula:
y=1 -> x1^2 + x2^2 = 1
Es decir, para esos parámetros de theta, la decision boundary es un círculo de radio 1.
Los valores fuera del círculo serán y=1

Usando polinomios de más orden podemos conseguir formás más "extrañas" que se adapten a nuestro training set.

Esta técnica se llama "feature mapping", mapeamos las features que tenemos a términos del polinomio mayores.
Puede llevarnos a hacer overfitting


# Cost function
No podemos usar la cost function de la regresión lineal (mean squared error), ya que no converge, tendría múltiples mínimos (no es una función convexa).

Usamos esta cost functión que si converge:
J = (1/m) sum_i=0,m(cost(h(x),y))

cost(h(x),y) = -log(h(x)) si y=1, -log(-1-h(x)) si y=0
  la primera es una curva exponencial donde h(x)=0 -> +inf y h(x)=1 -> 1  (curva que baja desde el infinito a 1)
  la segunda es simétrica verticalmente, h(x)=0 -> 0, h(x)=1 -> +if (curva que sube desde 0 hasta el infinito)

Otra forma de escribirla es (jugando con que y solo toma los valores 0 o 1, y anula una parte u otra de la ecuación):
cost(h(x),y) = -y*log(h(x)) - (1-y)*log(1-h(x))

NOTA: está limitando todo el tiempo a que h(x) varie entre 0 y 1, pero creo que no ha explicado por qué
https://www.coursera.org/learn/machine-learning/lecture/1XG8G/cost-function


# Feature scaling
También aplica para logistic regresion




# Algortimos de optimización

## Gradient descent
https://www.coursera.org/learn/machine-learning/supplement/0hpMl/simplified-cost-function-and-gradient-descent

Igual técnica que en regresión lineal.
La derivada parcial de J(theta) es:

(1/m) * sum_i=1,m ( (h(x)^i - y^i) * x_j^i )
Es la misma ecuación para linear regresión, lo que cambia es la definición de h(x)

## Otros avanzados
Conjugate gradient
BFGS
LBFGS

Ventajas:
 - no tenemos que elegir alpha manualmente
 - generalmente convergen más rápido
Desventajas:
 - más complejos, dificiles de comprender
 - no tratar de implementarlos, usar versiones ya implementadas
 - podemos encontrarnos malas implementaciones



# Multiclass classification
En este caso tendremos que y puede tomar varios valores, por ejemplo, y = [1,2,3,4]
Ejemplo, clasificar un email en: trabajo, amigos, familia, hobbies


## One-vs-all / one-vs-rest
Una forma de solventarlo es dividir el problema multiclass en n binarios.
En cada uno de los problemas elegimos un grupo y hacemos el otro grupo con el resto.
Esto nos dará un array de hipótesis, cada una para cada uno de los grupos.
h_theta = [h^1(x); h^2(x); h^3(x)] % es h "superscript" i, no es potencia

Cada hipótesis es la probabilidad de que y=i (sea el grupo elegido) dados unos inputs y para unos parámetros determinados.
h^i(x) = P(y=i|x;theta)

Para encontrar el resultado haremos:
max_i h^i(x)

Esto es, nos quedamos con la hipótesis que nos da un valor mayor y esa nos dirá que grupo estamos eligiendo.



# Regularización
Se hace similar a con regresión lineal, añadiendo un término (exluímos theta_0, como se comentó en la parte teórica):
J = (1/m) sum_i=0,m(cost(h(x),y)) + (alpha/2m)*sum_j=1,n(theta_j^2)

Si estamos haciendo los cálculos vectorizados, podemos calcular todo igual y luego restarle el componente de regularización a J(theta_0) y a su derivada parcial.


## Gradient descent
Nos queda una función como en regresión lineal, pero aquí nuestra hipótesis es distinta.

La derivada para cada término (excluyendo theta_0) nos queda:

(1/m) * sum_i=1,m ( (h(x)^i - y^i) * x_j^i ) + lambda*theta_i/m

Con estas derivadas para calcular el gradiente y la función de coste, ya podemos usar funciones implementadas en distintos lenguajes para calcular el minimo.
