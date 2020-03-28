Para instalar el binario:
curl -fsSL https://raw.githubusercontent.com/dapr/cli/master/install/install.sh | /bin/bash


Para arrancar dapr (por defecto en standalone, que arranca un container en docker):
dapr init
  arranca container "dapr_placement" escuchando en el puerto 50005
  arranca tambien container redis (visto en la doc, pero no lo veo desplegado)

dapr uninstall
  lo contrario a "dapr init"


# Kubernetes
dapr init --kubernetes
  para desarrollo

Para producción usar Helm

Despliega un operator, el "placement" y un inyector de sidecars.

mirar kubernetes.md
