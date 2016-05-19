Si queremos ver los mensajes que están pasando por un exchange-queue un truco puede ser duplicar la cola para que el exchange lo envie a las dos colas.

En el ejemplo que he tenido que hacer, el exchange es del tipo topic.
Esto quiere decir que el publisher envia mensajes al exchange con una routing-key determinada.
Lo que hago es crear otro cola (cola-dup) y un binding en el exchange que para el mismo routing-key (o topic) lo envie a ese segunda queue.
