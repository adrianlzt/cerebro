https://en.wikipedia.org/wiki/Circuit_breaker_design_pattern
Patron de diseño.

circuit breakers exists to allow one subsystem to fail without destroying the entire system


Evita llamadas a sistemas que no están disponibles.
La implementación de la comprobación del estado de los servicios debe estar separada del código y corriendo en paralelo.
Generalmente se utiliza algún tipo de almacenamiento persistente compartido donde se guarda el estado de los serivicos, para saber si se les puede llamar o no.

El código de la aplicación deberá utilizar el estado del servicio en el código para decidir como actuar.
La idea básica es actuar de forma distinta en caso de que los servicios que necesitamos no estén activos.


# Python
https://github.com/danielfm/pybreaker

Es un wrapper que ponemos sobre funciones peligrosas.
Almacena el estado del servicio al que estamos llamando y puede evitar más llamadas si el servicio no ha estado funcionando en las últimas llamadas.
Nos permite ejecutar funciones pre/post y en cambios de estado.
