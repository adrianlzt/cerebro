https://docs.openshift.com/container-platform/latest/dev_guide/application_lifecycle/new_app.html#specifying-a-template
https://docs.openshift.com/container-platform/latest/dev_guide/templates.html

Tambien podemos pasar a "new-app" un fichero yaml o json con la especificación de nuestra app (describes how OpenShift should run this docker image such as where to pull the docker image from, any persistent storage volumes required, ports to expose and other deployment information).
Aquí se puede especificar como queremos construir nuestra aplicación.

Para escribir el nuestro propio: https://docs.openshift.com/container-platform/3.3/dev_guide/templates.html#writing-description
Usar mejor JSON (en YAML tenemos problemas con caracteres raros / -, etc)


# Crear app a partir de un template
oc new-app -f template.yml


# Crear una template a partir de un proyecto existente
https://docs.openshift.com/container-platform/3.3/dev_guide/templates.html#export-as-template



# Estructura
Un template tiene tres partes principales.

## Cabecera
La "cabecera" donde definimos que es un "Template".
En ella pondremos el nombre, labels, message, metadata.


## Objects
Aquí definiremos lo que despliega nuestra template
Cosas típicas:
Secret
Service (expone los PODs con una VIP)
Route (crea una url publica para acceder al service)
PersistentVolumeClaim
BuildConfig (se baja un repo y crea pone la imagen en el ImageStream)
DeploymentConfig (como desplegar la app)
ImageStream (Keeps track of changes in the application image)¿?

## Parameters
Son variables que pondremos definir antes de lanzar el template.
Por ejemplo, la contraseña de una bbdd mysql, o la versión de la imagen de redis



Ejemplo de template reducido a su minima expresion





# Objetos que tendra un template
BuildConfig
Build
DeploymentConfig
ImageStream
Pod
ReplicationController
Route
Service



# Ejemplos
Ejemplos de templates:
https://github.com/openshift/library


Ejemplos para crear aplicaciones en distintos lenguajes / frameworks
https://github.com/openshift?utf8=%E2%9C%93&q=-ex&type=&language=
