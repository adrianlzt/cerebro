https://gtimelog.org/

Para almacenar el tiempo que trabajamos y en que.

La idea es de cuando empezamos poner:
start **

Y cuando terminamos una tarea simplemente ponemos el nombre.

Si después de una tarea hemos hecho una pausa, a la vuelta pondremos:
break **

Si ponemos tres asteriscos, se ignorará la tareas, no aparecerá en el reporte.

También se pueden asignar las tareas a categorías:
project1: fixing bug #1234

Y poner tags:
project3: upgrade webserver -- sysadmin www front-end

Podemos corregir errores de hora al marcar una tarea.
Por ejemplo, podemos forzar la hora:
09:30 morning meeting

O un offset en minutos
-10 morning meeting


Podemos editar el fichero, es texto plano ~/.local/share/gtimelog/timelog.txt


Virtual midnight.
Por defecto cada día termina a las 2:00am
Si una tarea cruza esa hora no se reportará bien. Mirar bug.
