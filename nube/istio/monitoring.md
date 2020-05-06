https://istio.io/docs/concepts/observability/

tracing, monitoring, and logging

Nos permite medir SLOs (los SLO son los detalles técnicos que forman el SLA, las cosas que medimos exactamente)
Ejemplo (de SLO, mirar si se puede sacar con istio): 99.5% of TCP replies within 4 seconds of receiving a request



# Kiali
Para acceder
iostioctl dashboard kiali
admin:admin

Nos muestra todos los namespaces, con sus workloads, tráfico, gráficos autogenerados, etc


# Envoy
Podemos acceder a la interfaz admin de los envoy de los pods
istioctl dashboard envoy NOMBREPOD



# Grafana
Nos da un grafana con uno cuantos dashboards ya creados
istioctl dashboard grafana

El de "Mesh dasboard" nos da un número de operaciones por segundo global.
Por cada service también tenemos número de peticiones, success rate y latencias por percentil

"Service dashboard" nos analiza el tráfico entrante y saliente.
Si seleccionamos uno de nuestros servicios veremos toda la info de peticiones entrantes, salientes, etc
También veremos acceso a servicios externos.



# Jaeger
istioctl dashboard jaeger

Nos permite seguir las transacciones, ver como van pasando por los distintos microservicios.



# ControlZ
https://istio.io/docs/ops/diagnostic-tools/controlz/
Análisis interno de los componentes de istio

istioctl -n istio-system dashboard controlz istiod-658df9d447-794z7
