https://www.wolframalpha.com/examples/mathematics/discrete-mathematics/combinatorics/
https://www.mathsisfun.com/combinatorics/combinations-permutations.html

Combinaciones sin repetición.
De N elementos, coger elementos de R en R, sin repetir y donde el orden no importa
(n!) / ((r!) × ((n - r)!))

Ejemplo, tenemos 3 nodos y queremos saber cuantas aristas necesitamos para unir todos los nodos entre sí (sin repetir aristas ni uniéndose a si mismos).

En python:
itertools.combinations([1,2,3,4], 2)
