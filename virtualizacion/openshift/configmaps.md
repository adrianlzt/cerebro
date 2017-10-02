# Variables de entorno
Irían en el Deployment Config


# Configmaps
https://docs.openshift.org/latest/dev_guide/configmaps.html

Es lo que usamos para almacenar configuraciones.
Estas configuraciones pueden ser valores o ficheros.
Luego las meteremos en los containers que las tendrán accesibles como venv.
O en caso de ser ficheros, lo podremos montar como directorios.

oc get cm

Ver contenido:
oc get cm nombre-config-map -o yaml



# Secrets
Igual que configmaps.
Son ficheros.
Solo lo puede ver el admin del proyecto.
Aunque no sería muy dificil saltarse la limitación para ver el secret (levantar un container y meternos en /run/secrets)

mirar secrets.md
