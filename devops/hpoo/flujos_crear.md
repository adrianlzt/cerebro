En cada paso podemos pedir las dependencias, a quien usa, y por quien es usado.

Cada paso tiene unos inputs (los vemos pinchando doble click sobre un paso).
Ahí decidiremos si ese input se lo pregunte al usuario (User Prompt), o también podemos definir nosotros la variable. O también usar varaible definidas en otro lado y hacer cosas tipo http://${IP de udo}:${puerto}/admin/bla  (para esto tenemos que editar el input y ponerlo como user defined)


Una salida de un paso puede salir como salida para el padre (flow output variable), o como variable global para todo el flujo (flow variable)

Usar los scriptlet lo menos posible, porque es mucho más dificil seguir que pasan con las variables.

A los outputs también podemos aplicarles expresiones regulares. Son de una manera un tanto rara. Lo bueno es que te deja poner un input de prueba y te muestra la salida del filtro que hacer.
Se pueden poner varias expresiones regulares una detrás de otras.


Los retornos (OK y EQUIS) pueden mostrar resultados, pero es más aconsable usar un paso de "Display message".

Se pueden editar los pasos para poner el icono que queramos (añadir es un poco rollo, porque tienen que tenerlos todos los devs y el central).

Para hacer líneas curvas hay que pinchar en el shift. Pinchar con el shift también para elimiar esas curvas.

Un best practice es editar el nombre y las salidas para mayor claridad. Por ejemplo en una comparación de cadenas, poner en el título del paso "ha sido correcto?" (por ejemplo) y en las salidas "Si" y "No".

Recomendable también renombrar los flujos, para cuando falle un reporte saber donde ir a buscar.


Bucles: podemos hacer un bucle intentando hacer una operación, si falla, esperamos, luego aumentamos un contador, y si es menor que n, volvemos a repetir la operación.
