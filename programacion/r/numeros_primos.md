Algoritmo para encontrar todos los números primos hasta un número:
Sieve of Eratosthenes
https://www.youtube.com/watch?v=eKp56OLhoQs&feature=player_embedded

La idea es crear una lista desde 2 hasta el número, por ejemplo, 15.
Luego ir iterando, y por cada número, tachar sus múltiplos.


Con las optimizaciones (buscando hasta sqrt(n)) tenemos una complejidad de: O(n*log*logn)
