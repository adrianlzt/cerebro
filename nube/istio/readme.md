https://istio.io
https://istio.io/docs/concepts/what-is-istio/

Istio support services by deploying a special sidecar (envoy) that intercepts all network communication between microservices
La otra pieza es un "control plane"
Mirar arquitectura.md

Automatic load balancing for HTTP, gRPC, WebSocket, and TCP traffic.
Fine-grained control of traffic behavior with rich routing rules, retries, failovers, and fault injection.
A pluggable policy layer and configuration API supporting access controls, rate limits and quotas.
Automatic metrics, logs, and traces for all traffic within a cluster, including cluster ingress and egress.
Secure service-to-service communication in a cluster with strong identity-based authentication and authorization.

Es platform independent, aunque muy orientado a usarse con K8s
Soporta: k8s, consul, mesos, VMs


Gestión de tráfico: traffic.md
Gestión de seguridad: security.md
Monitoring/observability: monitoring.md

install.md
