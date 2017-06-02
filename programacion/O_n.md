https://en.wikipedia.org/wiki/Big_O_notation
https://es.wikipedia.org/wiki/Cota_superior_asint%C3%B3tica
https://es.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation

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


# En espacio


# Análisis de algoritmos
http://www.lab.dit.upm.es/~lprg/material/apuntes/o/index.html

Típicamente querremos saber cuanto tiempo y cuanta memoria (espacio) lleva la ejecucción de un algoritmo para N (N puede ser distintas cosas, tamaño de un array, número de elmentos de una matriz, etc)

O(n^2), O(n^3) se pueden considerar en el orden de lo "tratable".
Si son mayores, esos algoritmos no serán útiles, solo para problemas muy pequeños.
