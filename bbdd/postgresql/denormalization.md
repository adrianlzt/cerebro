Algunas veces tiene mejor performance duplicar algún valor en una tabla por el uso que le vamos a dar, en vez de tener que hacer un join para ir a buscar ese valor.

Ejemplo:
Customers -> Orders -> OrderItems

En OrderItems podríamos tener solo el orderId, y de ahí sacar el customerId.
Pero si la idea es que al obtener la tabla de OrderItems necesitamos el customerId, podemos meterlo ahí. Estaremos duplicando el dato, pero ahorrando en las queries.
