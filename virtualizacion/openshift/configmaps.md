# Variables de entorno
Irían en el Deployment Config


# Configmaps
https://docs.openshift.org/latest/dev_guide/configmaps.html

Es lo que usamos para almacenar configuraciones.
Estas configuraciones pueden ser valores o ficheros.
Luego las meteremos en los containers que las tendrán accesibles como venv.
O en caso de ser ficheros, lo podremos montar como directorios.

Los cambios en los ConfigMaps se despliegan en los ficheros montados en los pods.
Pero debe ser el pod el que actue ante un cambio del fichero de config.

Cambiando un configmap no inician un redeploy, es una best practice el considerar los configmaps inmutables y en todo caso si hace falta un cambio se debería crear un nuevo configmap y asosciarlo al deploymentconfig que este si iniciara el rollout.  Además parece que si el nuevo confirma está roto el dc fallará y no hará un scale down y si está bien entonces si arrancará tus pods
https://github.com/kubernetes/kubernetes/issues/22368

oc get cm

Ver contenido:
oc get cm nombre-config-map -o yaml

Para modificar, ver patch.md



# Secrets
Igual que configmaps.
Son ficheros.
Solo lo puede ver el admin del proyecto.
Aunque no sería muy dificil saltarse la limitación para ver el secret (levantar un container y meternos en /run/secrets)

mirar secrets.md
