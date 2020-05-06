https://istio.io/docs/concepts/traffic-management/

mirar tambien
faults.md
circuit_breaking.md
mirroring.md

control the flow of traffic and API calls between services
circuit breakers, timeouts, and retries
Lo implementa Pilot + Envoy

Se usa el plugin CNI para modificar la red del pod (en el despliegue) y forzar que su tráfico pase por el sidecar.



Cliente externo ----http/https/tcp/tls-----> ingress gateway -----(encapsula TLS)----> envoy (del pod) ----(desencapsula TLS)---> app del pod
El ingress gateway decide a quien enviar la petición según los VirtualService que tenga configurados.



# Proxy
Imagen de istio-proxy / envoy
https://github.com/istio/istio/blob/master/pilot/docker/Dockerfile.proxyv2

Corre como el container "istio-proxy" en los pods manejados por istio.
Podemos correr tcpdump en el container principal y ver el tráfico manejado por el proxy.

Lo que se ejecuta es el pilot-agent, que arranca envoy
/usr/local/bin/pilot-agent proxy sidecar --domain istio-demo.svc.cluster.local --configPath /etc/istio/proxy --binaryPath /usr/local/bin/envoy --serviceCluster productpage.istio-demo --drainDuration 45s --parentShutdownDuration 1m0s --discoveryAddress istiod.istio-system.svc:15012 --zipkinAddress zipkin.istio-system:9411 --proxyLogLevel=warning --proxyComponentLogLevel=misc:error --connectTimeout 10s --proxyAdminPort 15000 --concurrency 2 --controlPlaneAuthPolicy NONE --dnsRefreshRate 300s --statusPort 15020 --trust-domain=cluster.local --controlPlaneBootstrap=false
\_ /usr/local/bin/envoy -c /etc/istio/proxy/envoy-rev0.json --restart-epoch 0 --drain-time-s 45 --parent-shutdown-time-s 60 --service-cluster productpage.istio-demo --service-node sidecar~10.233.123.108~productpage-v1-7d6cfb7dfd-6kr8q.istio-demo~istio-demo.svc.cluster.local --max-obj-name-len 189 --local-address-ip-version v4 --log-format [Envoy (Epoch 0)] [%Y-%m-%d %T.%e][%t][%l][%n] %v -l warning --component-log-level misc:error --concurrency 2


Para acceder a su api:
istioctl dashboard envoy NOMBREPOD


Podemos acceder a la interfaz administrativa de envoy con:
curl localhost:15000/help

Podemos acceder a la config con:
curl localhost:15000/config_dump


Envía información de traceo a Zipkin (zipkin.istio-system:9411/api/v2/spans)
Se conecta a istiod (istiod.istio-system.svc:15012) para el tema de autodescubrimiento (protocolo xDS-gRPC)

Puertos que levanta el proxy:
127.0.0.1:15000  envoy admin
0.0.0.0:15001    envoy
0.0.0.0:15006    envoy
0.0.0.0:15020    pilot-agent statusPort
0.0.0.0:15090    envoy prometheus metrics
  es una redirección interna a localhost:15000/stats/prometheus
  así pueden exponer las métricas sin tener que exponer el resto de interfaz administrativa de envoy

## Métricas
curl localhost:15090/stats/prometheus
curl localhost:15000/stats
  formato statsd https://www.envoyproxy.io/docs/envoy/latest/operations/stats_overview

Pilot-agent ready
localhost:15020/healthz/ready




# Ingress
https://istio.io/docs/tasks/traffic-management/ingress/
Usados para exponer los servicios fuera del mesh

## Ingress gateway
Será el punto de entrada a nuestra app (en vez de crear LoadBalancers/Ingress/NodePort).

Internamente es un pilot-agent + envoy (como el sidecar que se mete en los pods)
Podemos saltar al pod con bash

Lo que hace es montar él un service LoadBalancer que dirige varios puertos hacia el pod istio-ingressgateway (imagen docker.io/istio/proxyv2)

El LoadBalancer configura varios puertos sobre la IP de load balancer y sobre el nodo (nodePort):
  status-port
  http2
  https
  kiali
  prometheus
  grafana
  tracing
  tcp
  tls

Luego creamos un Gateway, lo entiendo como decir de que formas (http, https, tcp) vamos a poder entrar a nuestra mesh y con que vhosts


Obtener gateways configurados:
kubectl get gateway

Ejemplo de Gateway y VirtualService para meter tráfico a nuestra red mesh
https://raw.githubusercontent.com/istio/istio/release-1.5/samples/bookinfo/networking/bookinfo-gateway.yaml

Podemos poner certificados en el gateway, si usamos https.
El certificado lo podemos pasar como un secret, que deberá estar en el ns donde esté el ingressgateway

Cuidado al hacer pruebas.
Si tenemos configurado https tendremos que usar esto con curl para que funcione:
curl --resolve httpbin.domain:10.0.3.5 https://httpbin.usync.us/anything/secure


## Traffic routing
VirtualService: como enrutar tráfico hacia un destino
DestinationRules: que hacer con el tráfico que va hacia ese destino


### VirtualService
https://istio.io/docs/reference/config/networking/virtual-service/

La idea sería como un frontal HAProxy.

Según el host (se recomienda usar FQDN para evitar problemas entre namespaces) que el cliente quiere acceder y unos matchs (path con tal regexp, o tal header), decidimos a donde enviar el tráfico.
Podemos enviar el tráfico a Services de k8s o a sitios externos (pero tendremos que crear un ServiceEntry)
Si enviamos a un service interno, podemos especificar un "subset", que hará match con lo definido en un destinationrule para especificar más exactamente a donde queremos enviar el tráfico.
Por ejemplo, match para que tal user vaya al service foo subset=v1

Se puede especificar spec.gateways:[] para, entiendo, que solo afecte a las peticiones que entran por ese gateway

Tipos de match que podemos hacer: https://istio.io/docs/reference/config/networking/virtual-service/#HTTPMatchRequest

También podemos añadir pesos (canary releases), poner/quitar headers, reescribir URL, etc.
Todas las opciones en https://istio.io/docs/reference/config/networking/virtual-service/#HTTPRoute



Obtener configuraciones del gateway:
kc get virtualservices

La config en detalle de un "virtualservice":
kc get virtualservices bookinfo -o yaml

Ejemplo de Gateway y VirtualService para meter tráfico a nuestra red mesh
https://raw.githubusercontent.com/istio/istio/release-1.5/samples/bookinfo/networking/bookinfo-gateway.yaml

Ejemplo "tonto" de un VirtualService que recubre un service de k8s para solo enviar el tráfico a un subset (que estará especificado en un DestinationRules

apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: reviews-vs
spec:
  hosts:
  - reviews
  http:
  - route:
    - destination:
        host: reviews
        subset: v1


Otro spec diferenciando por una header:
spec:
  hosts:
  - reviews
  http:
  - match:
    - headers:
        end-user:
          exact: jason
    route:
    - destination:
        host: reviews
        subset: v2
  - route:
    - destination:
        host: reviews
        subset: v1



### Destination rules
https://istio.io/docs/concepts/traffic-management/#destination-rules
https://istio.io/docs/reference/config/networking/destination-rule/

Sirve de load balancer ante los pods. Sustituyen a los Service de k8s.
Nos permite especificar subsets, por si queremos, desde un VirtualService, atacar a una versión determinada.

kc get destinationrule

Lo que hacemos es crear estas destinationrule donde asignamos un nombre a un grupo de pods seleccionados mediante un label.
La destinationrule tendrá un "host" (que entiendo que es el Service que "wrapea") y unos "subsets", que es donde asociamos nombres a labels de los pods.
Por ejemplo, este spec, crearía un DR sobre el Service "reviews", creando el subset "v1" y "v2" que enviarían al tráfico a los pods seleccionados por las label del Service original más las labels puestas en el subset:
  host: reviews
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2

Por ejemplo, para ver que pods serían el destino para este caso (suponiendo que el Service reviews usa app=reviews):
kc get pod -l app=reviews,version=v2


Ejemplos: https://raw.githubusercontent.com/istio/istio/release-1.5/samples/bookinfo/networking/destination-rule-all.yaml



# Egress
https://istio.io/docs/tasks/traffic-management/egress/
Gestionar tráfico de salida de la mesh hacia otros servicios
