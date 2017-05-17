Código de oc:
https://github.com/openshift/origin/blob/master/cmd/oc/oc.go
https://github.com/openshift/origin/tree/master/pkg/cmd/cli


# Proyectos

## Crear un proyecto
oc new-project nodejs-echo --display-name="nodejs" --description="Sample Node.js app"


# Estado global
oc status

# Todos los objectos
oc get all

# Listar Deployment Configs
oc get dc
  ver todas las cosas que hemos desplegado sobre openshift
  puede que tengamos dc que no sean services (porque no han exportado nada)



# Apps / Deployed Configs / dc
## Crear
Usando un template almacenado en github:
oc new-app https://github.com/openshift/golang-ex -l name=myapp

El nombre que se usará es el nombre del repo "golang-ex".
Asignamos también una etiqueta (-l).

"new-app" se baja el repositorio, analizará el contenido y decidirá que debe hacer según el código que haya (javascript, node, django, python, etc)

Si encuentra un Dockerfile hará un docker build.

Si no, analizará el código para intentar hacer un S2I (source to image)
Para detectar el lenguaje analiza los ficheros que ve: https://docs.openshift.com/container-platform/3.3/dev_guide/application_lifecycle/new_app.html#language-detection
Luego buscará imágenes que tenga con la tag "support" con el lenguaje que ha detectado.

A parte de los steps del Dockerfile, openshift añadirá dos extras añadiendo variables de entorno y labels (mirar internals.md para los detalles).
La imagen creada se sube al registry interno de openshift.
Por defecto esta app no es accesible (tendremos que exportar algún puerto para convertirla en un Service)



### A partir de imagenes de docker
oc new-app adrianlzt/packagedrone


### Dos containers como un solo pod
oc new-app nginx+mysql --name=mydbapp -e MYSQL_ROOT_PASSWORD=root
  mirar kubernetes/internals.md para mas detalle de como funciona esto

oc new-app ruby~https://github.com/openshift/ruby-hello-world mysql --group=ruby+mysql
  otra forma


## Borrar
oc delete dc NOMBRE



# Servicios (exponer apps, abrir puertos)
oc get services
  listar

Crear un clusterip
oc create service clusterip NOMBRE --tcp=9999:80
  el selector que decide donde apuntará esta ip será "app=NOMBRE"



# Routes / Expose
Configurar el router (haproxy como proxy inverso) para abrir un endpoint publico para acceder a nuestros services

Si estamos usando un template para desplegar nuestra app donde ya esté configurada una route, podemos hacer:
oc expose svc/MIAPP
  Esto creará un service y una ruta para ese service.




# Pods
oc get pods
  listar todos
  tambien podemos ver su estado (Running, completed, CrashLoopBackOff)

oc rsh POD
oc rsh -c CONTAINER POD 
  conectar a un pod (como docker exec -it)
  si no especificamos -c, conectará al primer container del pod

Info detallada de un pod
oc describe pod NOMBRE
  



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
