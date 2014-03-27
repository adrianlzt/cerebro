Dentro de EC2

Load Balancer (LB):

Soporte HTTP, HTTPS, TCP y SSL.
Se puede llevar el SSL desde el cliente al balanceador, y desde ahí que sea por ejemplo HTTP sin SSL, y ahorrar el procesado de SSL en nuestras máquinas.

Balanceador para repartir la carga entre distintos hosts.
Lo normal es que el balanceador sea la cara pública, y detrás podemos tener una o varías máquinas (autoscaling tal vez) donde se repartar la carga.
Las máquinas deben estar dentro de la misma availability zone (LB y máquinas por detrás)

Tenemos que decirle al LB como chequear las máquinas que tiene colgando para saber si siguen vivas.
Estos pueden ser checks tcp, http, etc.
CUIDADO con chequear MySQL con checks tcp, porque MySQL lo detectará como una conexión incorrecta, y al cabo de 10 (valor por defecto) marcará esa IP como bloqueada (los checks seguirán funcionando, pero no se podrá hacer login a MySQL desde esa ip bloqueada).

Este check tiene los parámetros:
  Timeout: tiempo en el que espera el ACK
  Interval: cada cuanto chequear las máquinas
  Unhealthy threshold: cuantos intentos antes de dejar de enviar tráfico a la máquina
  Healthy threshold: cuantos intentos antes de volver a enviar tráfico a la máquina

Los checks se hacen a las máquinas todo el tiempo, estén healthy o no.


Si queremos LB internos se hará con VPC.


Detalles, que no salen en wizard:
Cuidado si ponemos otra cosa que no sea index.html, porque seguramente el wizard ponga index.html y tengamos que volver a editarlo.
Sticky session: si un usuario ha ido a una instancia, siempre vaya a la misma siempre esté activa esa instancia.
  Se puede hacer usando una cookie de nuestra app, o una que meta amazon.


CLI:
aws elb create-load-balancer --load-balancer-name loadTest --listeners "Protocol=tcp,LoadBalancerPort=80,InstanceProtocol=tcp,InstancePort=80" --availability-zones eu-west-1a

Define un health check por defecto:
Ping Target: 		TCP:80
Timeout: 		5 seconds
Interval: 		30 seconds
Unhealthy Threshold: 	2
Healthy Threshold: 	10


Contras:
El balanceador no escala del todo bien.
Si pasamos de 0 a 500.000 peticiones en 60" el ELB se queda tostado.
El ELB necesita tiempo para ir absorviendo tantas peticiones (necesita escalar él)
  Una solución es "precalentarlo". Si sabemos cuando va a recibir las peticiones, 10' antes nos tiramos 5' enviándole muchas peticiones.
  Analizando las peticiones en el ELB podemos ver como la gráfica va creciendo, luego llega a un valle hasta que, parece que internamente vuelve a crecer, y sigue creciendo la gráfica, otro valle, etc.
  El tráfico entre instancias es gratuito.

El balanceador nos da métricas de los errores 200, 400 y 500 que está devolviendo hacia clientes, con una resolución máxima de 1'.
También nos da los errores 200, 500 y 500 desde el ELB a nuetras app.


El balanceador nos permite tener únicamente sticky session.
Generalmente la sesión se gestiona en la app, por ejemplo en el server de apps (tomcat) de amazon se puede replicar la sesión entre los nodos.


# Logs #
Se puede acceder a los logs de los balanceadores:
With Access Logs, you can obtain request-level details in addition to the existing load balancer metrics provided via CloudWatch. The logs contain information such as client IP address, request path, latencies, and server responses. You can use this data to pinpoint when application errors occurred or response times increased, and which requests were impacted. 
