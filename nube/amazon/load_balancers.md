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

