What Every Programmer Should Know About Memory
https://akkadia.org/drepper/cpumemory.pdf


23/02/2013    https://foro.elchapuzasinformatico.com/memoria-ram-ddr3-ddr4-hbm-/4491-que-diferencia-hay-entre-ram-cl9-cl11.html#post774872

Las memorias RAM van ofrecen 2 datos para el comprador: velocidad y latencia. Latencia indica el tiempo que tarda hasta acceder a la info... y la velocidad... se entiende por sí sola. Ambos parámetros van "como por escalones", siendo mejor cuanto más velocidad y menor latencia. La cuestión importante aqui es saber como comparar dos memorias:

- La latencia va por escalones (del 7 al 11 normalmente) siendo el estándar actual cl9.
- La velocidad va creciendo también de forma tabulada (2800+(OC)/2400(OC)/2133(OC)/1866(OC)/1600/1333/1066) siendo el valor de referencia actual 1600MHz. Para velocidades superiores a 1600Mhz vemos que vienen acompañadas de las letras (OC); esto implica que para llegar a esa velocidad deberemos ajustarlas de forma más o menos manual, ya que las placas por norma general las detectan como 1333 o 1600.


Partiendo entonces del estandar 1600MHz CL9, para saber cómo de buena es una RAM deberíamos hacer la siguiente cuenta:

- Por cada nivel de latencia por encima de CL9 aplicamos -1 (si los niveles fueran por debajo sería +1). De modo que una memoria CL11 estaría sumando -2 ya que es 2 escalones peor que la CL9

- Por cada nivel de velocidades por encima de 1600MHz aplicamos +1 (si fuera por debajo aplicamos -1). De modo que una memoria a 2133MHz estaría aplicando +2.

- A igualdad de puntuación, para un uso habitual, suele ser preferible aquella de más velocidad.
