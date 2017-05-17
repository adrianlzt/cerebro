# Crear app
Usando un template almacenado en github:
oc new-app https://github.com/openshift/golang-ex -l name=myapp

El nombre que se usará es el nombre del repo "golang-ex".
Asignamos también una etiqueta.

"new-app" se baja el repositorio, hace un build del Dockerfile (un pod) y arranca la imagen construída (otro pod).
A parte de los steps del Dockerfile, openshift añadirá dos extras añadiendo variables de entorno y labels (mirar internals.md para los detalles).
La imagen creada se sube al registry interno de openshift.
Por defecto esta app no es accesible.



# Logs
-f hace como "tail -f"


Logs del build del Dockerfile:
oc logs buildconfig/nombreApp
oc logs bc/nombreApp


Logs del servicio (aplicación corriendo):
oc logs deploymentconfig/nombreApp
oc logs dc/nombreApp
