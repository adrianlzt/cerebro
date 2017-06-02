https://en.wikipedia.org/wiki/Big_O_notation
https://es.wikipedia.org/wiki/Cota_superior_asint%C3%B3tica
https://es.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation

Es una cota superior a nuestra función a partir de un punto.
A partir de x0, la función de la notación O siempre debe ser mayor.

Con esta notación estamos diciendo una cota superior del tiempo que puede tardar una función.
La función podrá tardar menos.

La idea es que nos dan una función con un parámetro N y debemos obtener la función que lo acota superiormente cuando N tiende a valores grandes.

O(1) sería que encontraríamos el resultado (la función terminaría) en el primer ciclo.
Una búsqueda binaria es O(log n)

De mejor a peor: https://en.wikipedia.org/wiki/Big_O_notation#Orders_of_common_functions
https://en.wikipedia.org/wiki/Time_complexity#Table_of_common_time_complexities

notación			         nombre
O(1)                   orden constante
O(log log n)           orden sublogarítmico
O(log n)               orden logarítmico
O((log n)^c), c>1      orden logarítmico
O(n^c), 0<c<1          orden potencia fraccional
O(n)                   orden lineal
O(n*log*n)             log asterisco: 0 n<=1, 1+log*(log n) n>1
O(n*log n)             orden lineal logarítmico
O(n^2)                 orden cuadratico
O(n^c)                 orden potencial/polinomial/algebraico
O(c^n), n > 1          orden exponencial
O(n!)                  orden factorial
O(nn)                  orden potencial exponencial

Gráfica https://commons.wikimedia.org/wiki/File:Comparison_computational_complexity.svg#/media/File:Comparison_computational_complexity.svg
