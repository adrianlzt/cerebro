Steven Skiena's The Algorithm Design Manual

Mirar:
data_structures.md
sorting.md
trees.md
graphs.md
hashtables.md
dynamic_programming.md (almacenar calculos ya realizados para usarlos en futuras iteraciones)


# Notacion O
https://en.wikipedia.org/wiki/Big_O_notation
https://es.wikipedia.org/wiki/Cota_superior_asint%C3%B3tica
https://es.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation
https://appliedgo.net/big-o/


Es una cota superior a nuestra función a partir de un punto.
A partir de x0, la función de la notación O siempre debe ser mayor.

Con esta notación estamos diciendo una cota superior del tiempo que puede tardar una función.
La función podrá tardar menos.

La idea es que nos dan una función con un parámetro N y debemos obtener la función que lo acota superiormente cuando N tiende a valores grandes.
Debemos encontrar la cota superior más pequeña.

O(1) sería que encontraríamos el resultado (la función terminaría) en el primer ciclo.
Una búsqueda binaria es O(log n)

De mejor a peor: https://en.wikipedia.org/wiki/Big_O_notation#Orders_of_common_functions
https://en.wikipedia.org/wiki/Time_complexity#Table_of_common_time_complexities

Tabla no exhaustiva
notación			         nombre
O(1)                   orden constante
O(log n)               orden logarítmico
O(n^c), 0<c<1          orden potencia fraccional
O(n)                   orden lineal
O(n*log n)             orden lineal logarítmico
O(n^2)                 orden cuadratico
O(n^c), c>2            orden potencial/polinomial/algebraico
O(c^n), n>2            orden exponencial
O(n!)                  orden factorial
O(n^n)                  orden potencial exponencial

Gráfica https://commons.wikimedia.org/wiki/File:Comparison_computational_complexity.svg#/media/File:Comparison_computational_complexity.svg



## En espacio
Constant additional space
  Esto quiere decir que el consumo de memoria debe ser contaste independiente de N.
  Por ejemplo, si tenemos que iterar una lista, la cantidad de memoria que usemos debe ser independiente del tamaño de la lista




## Análisis de algoritmos
http://www.lab.dit.upm.es/~lprg/material/apuntes/o/index.html

Típicamente querremos saber cuanto tiempo y cuanta memoria (espacio) lleva la ejecucción de un algoritmo para N (N puede ser distintas cosas, tamaño de un array, número de elmentos de una matriz, etc)

O(n^2), O(n^3) se pueden considerar en el orden de lo "tratable".
Si son mayores, esos algoritmos no serán útiles, solo para problemas muy pequeños.

Un algoritmo de complejidad logarítima -> lo mejor
Lineal -> esta bien
Polinomial -> se puede usar
Exponencial -> buscar otro

También podemos tener algoritmos con función O() más grande, pero que se comporten mejor con N pequeños.
Por ejemplo: 100*n VS n^2

Normalmente tenemos un compromiso entre velocidad y memoria.
Poco tiempo implica mucha memoria y viceversa.

Muchas veces serán problemas de límites. Hacer un sumatorio de la cantidad de vueltas que vamos dando y encontrar una cota superior.


### Reglas
IN quiere decir que pertecen al conjunto de funciones de

f,g IN O(h) => f+g IN O(h)
Sea k una constante, f(n) IN O(g)  =>  k*f(n) IN O(g)
Si  f IN O(h1)  y  g IN O(h2)  =>  f+g IN O(h1+h2)
Si  f IN O(h1)  y  g IN O(h2)  =>  f*g IN O(h1*h2)
Sean los reales  0 < a < b  =>  O(n^a) es subconjunto de O(n^b)
Sea P(n) un polinomio de grado k  =>  P(n) IN O(n^k)
Sean los reales a, b > 1  =>  O(log_a) = O(log_b)


## Amortized
https://stackoverflow.com/questions/11102585/what-is-amortized-analysis-of-algorithms
Es un cálculo promedio del tiempo que puede desestimar casos raros muy costosos.




# Detección de bucles
Dos punteros avanzando a distinta velocidad en algún momento se encontrarán en el bucle.
https://en.wikipedia.org/wiki/Cycle_detection#Floyd.27s_Tortoise_and_Hare



# Estructuras de datos
A parte de arboles, hashtables, graphs:

Problemas NP-completos, entender que significa.
Ejemplos: traveling salesman and the knapsack problem


# Algoritmos importantes
Breadth First Search
Depth First Search
Binary Search
Merge sort
Quick sort
Tree insert / Find / etc


# Conceptos
Manipulaciones de bit
Singleton Design Pattern
Factory Design Pattern
Memory (Stack vs Heap)
Recursion



# Recursion VS iteration
Las recursiones, funciones que se llaman a si mismas, tienen un coste por tener que ir almacenando en el stack el punto donde debemos saltar a la vuelta. También puede que sea necesario una copia de la memoria para permitir aislamiento del scope de la nueva función.

En los juegos parece que lo normal es que tengamos que buscar un método iterativo. Los recursivos serán demasiado costosos.

Cualquier recursion se puede modelar como una iteración, pero puede hacer nuestro código más complicado. Solo debería cambiarse una recursion legible por una iteración si un profiling indicase que es necesario.



# Algoritmo de Boyer-Moore para buscar la mayoria
https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm
Time: O(n)
Space: O(1)
Se va recorriendo el array sumando 1 cuando encontremos un elemento igual que el del comienzo, -1 si es diferente.
Si esa cuenta llega a 0, cambiamos el elemento que contamos por el que haya logrado llevar la cuenta a 0.
Funciona mientras exista un elemento que aparezca más de la mitad de las veces.
