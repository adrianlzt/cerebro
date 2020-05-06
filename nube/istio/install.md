https://istio.io/docs/setup/getting-started/

Necesitamos instalar la cli de istio (istioctl).
Esta cli desplegará sobre la plataforma todo lo necesario.

Arch (AUR): yay istio-bin


# Despliegue
Haciendo uso de istioctl desplegaremos un "profile" (mirar profiles.md)


## Desplegar profile demo
istioctl manifest apply --set profile=demo

Hace el despliegue sobre el namespace "istio-system"
Despliega los pods:
istiod
istio-tracing
istio-egressgateway
istio-ingressgateway
kiali
grafana
prometheus


Definiremos una label que se aplicará por defecto a todo lo que despleguemos, para indicar a istio que debe inyectar envoy.
Pondremos esta label en el namespace donde desplegaremos los pods que queremos que sean "capturados" por istio:
kubectl label namespace NOMBRENS istio-injection=enabled

Si queremos inyectar el sidecar luego mirar sidecar.md


Desplegar app demo (sobre un NS donde hayamos puesto la label):
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.5/samples/bookinfo/platform/kube/bookinfo.yamlsamples/bookinfo/platform/kube/bookinfo.yaml

Permitir acceso a la app desde fuera:
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.5/samples/bookinfo/networking/bookinfo-gateway.yaml

