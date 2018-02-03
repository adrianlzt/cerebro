# Charla FOSDEM 2018 "The RED method"

Para cada servicio chequear:
  - rate: numero de req/s
  - error rate: número de cuantas de esas req están falladas
  - duration distribution: cuanto tiempo están tardando esas req

Vale para que una persona pueda tratar un servicio como un blackbox y entender que está pasando.

Se centra en los servicios y no en el hardware de debajo.

Como obtenemos los tiempos de las requests?
 - instrumentar el código para que exponga las métricas
 - usar lttng para obtener esos datos?


Beneficios:
  - se centra en lo que interesa al developer
  - no requiere un conocimiento profundo de la arquitectura
  - no necesita acceso a los internals de los recursos

Drawbacks:
  - No tiene muchas herramientas para usarlo ni checklists
  - Focus en responder "qué" más que "por qué"

