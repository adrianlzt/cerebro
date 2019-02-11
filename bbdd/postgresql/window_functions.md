https://www.postgresql.org/docs/current/tutorial-window.html
https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS
https://www.postgresql.org/docs/current/functions-window.html

Nos permite mostrar una nueva columna que realiza cálculos sobre una "ventana" de datos.


Ejemplo calculando la delta de una serie de números (restando el previo al actual):
select valor - lag(valor) over() from contador;

Cuidado con el coste!
Analizar primero.
Si tenemos partitions puede que sea muy costoso.
