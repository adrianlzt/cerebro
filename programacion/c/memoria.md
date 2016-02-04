Nunca uses malloc

Usa siempre calloc. No hay penalización de rendimiento por tener la memoria limpia, llena de ceros.

Los lectores han informado de un par de cosas:

calloc sí tiene un impacto en el rendimiento en asignaciones enormes
calloc sí tiene un impacto en el rendimiento en plataformas extrañas (sistemas empotrados, videoconsolas, hardware de 30 años de antigüedad, …)
una buena razón para no usar malloc() es que no puede comprobar si hay un desbordamiento y es un potencial fallo de seguridad

Una ventaja de usar calloc() directamente es que, al contrario que malloc(), calloc() puede comprobar un desbordamiento porque suma todo el tamaño necesario antes de que lo pida.
