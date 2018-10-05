http://btorpey.github.io/blog/2017/05/10/join/

Unir dos ficheros en uno solo.
Útil cuando, por ejemplo, queremos unir las trazas de log de dos ficheros para verlos juntos.

Es como el inner u outer join de SQL

Al hacer sort de números, tiene que ser el sort alfabético, no el sort -n

Un "ps aux | sort -k 2" no funciona porque los numero del pid están tabulados a la derecha (se compara " 1" con "10")



Para unir lineas mirar regex/paste.md

Para comparar ficheros comm.md


Ejemplo que nos devuelve el nombre, user y número de hijos de los 5 pids con más hijos:
join -o "1.1 2.2 2.3" -1 2 -2 1 <(ps --no-headers -eo ppid:1 | sort | uniq -c | sort -k 2) <(ps --no-headers -eo pid:1,user,command | sort -k 1b,1) | sort -n | tail -5

-o "1.1"
dice que lo primero que se debe sacar es el primer campo del primer fichero
-1 2
dice que el campo join debe efectuarse con el segundo campo del primer fichero
