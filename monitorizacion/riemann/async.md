http://riemann.io/howto.html#asynchronous-streams

El procesado de riemann se produce de forma sincrona.
Un cliente envia un evento, que fluye por todos los streams y se devuelve la contestación al terminar.

Si queremos que cierto stream sea asíncrono deberemos usar:
async-queue!

Debemos tener cuidado con esta función y NUNCA llamarla dinámicamente.


Si tenemos que, por ejemplo, hacer una petición http a un servicio externo, seguramente querramos usar esto para evitar encolar eventos.
