# Proyectos

## Crear un proyecto
oc new-project nodejs-echo --display-name="nodejs" --description="Sample Node.js app"


# Estado global
oc get all



# Apps
## Crear
Usando un template almacenado en github:
oc new-app https://github.com/openshift/golang-ex -l name=myapp

El nombre que se usará es el nombre del repo "golang-ex".
Asignamos también una etiqueta.

"new-app" se baja el repositorio, hace un build del Dockerfile (un pod) y arranca la imagen construída (otro pod).
Creo que si no hay Dockerfile intenta buscar REPO/openshift/templates/XXX.json, donde se especifica como montar la app en openshift.
A parte de los steps del Dockerfile, openshift añadirá dos extras añadiendo variables de entorno y labels (mirar internals.md para los detalles).
La imagen creada se sube al registry interno de openshift.
Por defecto esta app no es accesible.



# Servicios (exponer apps, abrir puertos)

Si estamos usando un template para desplegar nuestra app donde ya esté configurada una route, podemos hacer:
oc expose svc/MIAPP
Esto creará un service y una ruta para ese service.



# Pods
oc get pods
  listar todos

oc rsh POD
  conectar a un container (como docker exec -it)



# Logs
oc logs [-f] [-p] POD [-c CONTAINER] [options]

-f hace como "tail -f"


Logs del build del Dockerfile:
oc logs buildconfig/nombreApp
oc logs bc/nombreApp


Logs del servicio (aplicación corriendo):
oc logs deploymentconfig/nombreApp
oc logs dc/nombreApp


Tambien podemos especificar los logs de un POD determinado:
oc logs golang-ex-1-7fg92

O de un container determinado de un pod:
oc logs golang-ex-1-7fg92 -c xxx
