https://www.postgresql.org/docs/current/tutorial-window.html
https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS
https://www.postgresql.org/docs/current/functions-window.html

Nos permite mostrar una nueva columna que realiza cálculos sobre una "ventana" de datos.


Ejemplo calculando la delta de una serie de números (restando el previo al actual):
select valor - lag(valor) over() from contador;

Cuidado con el coste!
Analizar primero.
Si tenemos partitions puede que sea muy costoso.



# Filtrar dentro de un grupo
https://stackoverflow.com/a/44213323
https://gist.github.com/tototoshi/4376938

Usamos row_number para que nos numere dentro del grupo que generemos con "partition by".
Luego filtramos para solo queadarnos el que necesitemos.

select "ID", "NUMBER", "VALUE" from 
(select t.*
 ,row_number() over (partition by "NUMBER" 
                     order by "VALUE" desc
                    ) as rno
from table1 t
) t1
where t1.rno <=2;
