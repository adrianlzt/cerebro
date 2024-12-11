aur/camotics

Para simular el resultado final al cargar un fichero .cnc

He tenido que crear una tool a mano que concuerde en número de identificación puesto en el gcode para que use esa herramienta.

También he tenido que definir el stock material a mano, porque ponía uno muy grande.

Si el programa muere por OOM, reducir la resolcuión (en el fichero json).

Si el gcode no especifica tool, cogerá la 1. En la UI me falla editarla, hacerlo en el json.
