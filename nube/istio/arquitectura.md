https://istio.io/docs/ops/deployment/architecture/

https://hub.helm.sh/charts/ibm-charts/ibm-istio
resumen de una frase de cada uno de los elementos


Dos partes principales:
 - proxies
 - control plane

Los proxies son sidecars (www.envoyproxy.io) que controlan el tráfico entrante y saliente hacia los pods.
El control plane controla los proxies.


# Componentes

## Core

### Control-plane

#### Pilot
Hace el service discovery de los envoys que se vayan desplegando (la plataforma, k8s por ejemplo, notifica al "platform adapter" los nuevos envoys)
Traduce configuraciones de istio en reglas particulares para cada envoy.
Mirar traffic.md

Mixer
A centralized component that is leveraged by the proxies and microservices to enforce policies such as authorization, rate limits, quotas, authentication, request tracing and telemetry collection.
Por lo visto chupa bastante CPU para convertir todos los datos que le llegan en info útil.

#### Citadel
Gestor de la seguridad
service-to-service and end-user authentication with built-in identity and credential management
Mirar security.md

#### Galley
Hace de capa de traducción entre la plataforma e Istio.
Da una intefaz homogénea para el resto de elementos de Istio, para que puedan abstraerse de la plataforma donde esté corriendo.

#### CNI
https://istio.io/docs/setup/additional-setup/cni/
Plugin que se inyecta el la fase de configuración de la red del pod para forzar que envie todo su tráfico al sidecar.

#### NodeAgent
A per-node component responsible for certificate issuance and rotation.




### Ingress gateway
mirar traffic.md
Usados para exponer los servicios fuera del mesh

### Egress gateway
mirar traffic.md
Gestionar tráfico de salida de la mesh hacia otros servicios


### Proxy - Envoy
virtualizacion/kubernetes/envoy.md

Traffic control features: enforce fine-grained traffic control with rich routing rules for HTTP, gRPC, WebSocket, and TCP traffic.
Network resiliency features: setup retries, failovers, circuit breakers, and fault injection.
Security and authentication features: enforce security policies and enforce access control and rate limiting defined through the configuration API.
Pluggable extensions model based on WebAssembly that allows for custom policy enforcement and telemetry generation for mesh traffic.

Usa sidecarInjectorWebhook https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#admission-webhooks
para inyectar el sidecar en los nuevos pods.




## Addons

### Grafana
Visualizador para kiali y prometheus

### Kiali
Kiali works with Istio to visualise the service mesh topology, features like circuit breakers or request rates.
Consola para entender la estructura de nuestra app, infiriendo la topología.
Provee métricas y integración con grafana.
Se integra con Jaeger (tracing)

### Prometheus
Obtiene las métricas de kubernetes ¿y otros componentes?

### Istio-tracing
Istio uses Jaeger or Zipkin as a tracing provider that is used for monitoring and troubleshooting Istio service mesh.
docker.io/jaegertracing

### Istio-coredns
https://github.com/istio-ecosystem/istio-coredns-plugin
A CoreDNS gRPC plugin to serve DNS records out of Istio ServiceEntries.

### CertManager
https://github.com/jetstack/cert-manager
An Istio add-on to automate the management and issuance of TLS certificates from various issuing sources.
