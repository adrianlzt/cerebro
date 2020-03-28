dapr provee con el sidecar una API a las aplicaciones para poder hacer uso de los building blocks.

La app tendrá el puerto de su "sidecar" dapr en la variable de entorno DAPR_HTTP_PORT

Implementación de las APIs
cat go/src/github.com/dapr/dapr/pkg/http/api.go | grep -i route


# Llamadas entre apps
curl http://localhost:4500/v1.0/invoke/NOMBREAPP/method/NOMBREMETODO

De esta manera llamamos a una app determinada a un método determinado.
Podemos usar cualquier dapr para atacar a cualquier app. De esta manera nos es sencillo comunicarnos con apps externas.

En caso de intentar llamar a un servicio no registrado HTTP/500:
{"errorCode":"ERR_DIRECT_INVOKE","message":"couldn't find service: mynode"}


## Como funciona
cliente ---invoke--> dapr1 (llamada HTTP del cliente)
dapr udp:5353 para descubrir al otro dapr2 al que estamos llamando?
por lo que veo en las conex, llamada a un multicast donde escuchan todos los dapr?
dapr1 --gRPC--> dapr2 (se usa gRPC para pedir cosas entre los dapr)
dapr2 --HTTP--> aplicación (el sidecar pegado a la app es el que hace la petición a la app)
la app tal vez se conecta con el sidecar para obtener un estado, o hablar con otra tercera app
app --HTTP--> dapr2
dapr2 --gRPC--> dapr1
dapr2 --HTTP--> cliente



# Estado / state
curl http://localhost:3500/v1.0/state -H "Content-Type: application/json" -d '[{"key": "foo", "value": "bar"}]'
Esto almacenará en redis (o la bbdd key-value elegida) un hash de nombre NOMBREAPP-foo con:
{
  "data": "\"bar\"",
  "version": 1
}


Para obtener el valor de vuelta:
curl http://localhost:3500/v1.0/state/foo -H "Content-Type: application/json"


Por lo que veo, el estado es local a cada app.
Cada darpd usará como prefijo su id, por lo que preguntar a state/foo en la app "test" pedirá la key "test-foo" en redis.
Por lo tanto, redis es común, pero los state "independientes".

Para que esto funcione cada app levantada con dapr tendrá que especificar que sistema de pubsub utiliza.
Corriendo en local con "dapr run ..." tendremos que tener un directorio components/ con:


Para que esto funcione cada app levantada con dapr tendrá que especificar que sistema de state utiliza.
Corriendo en local con "dapr run ..." tendremos que tener un directorio components/ con:
redis.yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: statestore
spec:
  type: state.redis
  metadata:
  - name: redisHost
    value: localhost:6379
  - name: redisPassword
    value: ""

En k8s se aplican esos YAML como CRDs contra el cluster de kubernetes y los usan todas las apps.



# pub/sub
NOTA: parece que hay discrepancia en los docs y en el código, aquí pongo lo funciona (como en el código)
Tendremos los dos típicos roles: publisher y subscribers.

En el arranque de las apps, dapr les pregunta a que topics quieren subscribirse:
  curl localhost:5000/dapr/subscribe
    devolverá un array con los nombres, ej.: ["A", "B"]

Los publishers enviarán mensajes a su dapr:
  curl localhost:3500/v1.0/publish/NombreTopic -H "Content-Type: application/json" -d 'foo'

A los subscribers les llegará un mensaje JSON enviado como:
  curl localhost:5000/A -H "Content-Type: application/json" -d '
{
  "id": "934d6876-1a61-4338-9aa0-efbf8f00aad4",
  "source": "Parrotring-Jaguar",
  "type": "com.dapr.event.sent",
  "specversion": "0.3",
  "datacontenttype": "text/plain",
  "data": "foo"
}'


Para que esto funcione cada app levantada con dapr tendrá que especificar que sistema de pubsub utiliza.
Corriendo en local con "dapr run ..." tendremos que tener un directorio components/ con:
redis_messagebus.yaml:
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: messagebus
spec:
  type: pubsub.redis
  metadata:
  - name: redisHost
    value: localhost:6379
  - name: redisPassword
    value: ""


En k8s se aplican esos YAML como CRDs contra el cluster de kubernetes y los usan todas las apps.
