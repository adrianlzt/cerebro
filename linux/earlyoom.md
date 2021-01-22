https://github.com/rfjakob/earlyoom

Comprueba el valor de la memoria y la swap periódicamente.
Si ambos bajan por debajo del 10% mata al proceso según el oom_score.

Es un demonio.

Podemos configurar regexp para evitar que mate a ciertos procesos.
