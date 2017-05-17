https://docs.openshift.com/container-platform/3.3/dev_guide/application_lifecycle/new_app.html#specifying-a-template
https://docs.openshift.com/container-platform/3.3/dev_guide/templates.html#dev-guide-templates

Tambien podemos pasar a "new-app" un fichero yaml o json con la especificación de nuestra app (describes how OpenShift should run this docker image such as where to pull the docker image from, any persistent storage volumes required, ports to expose and other deployment information).
Aquí se puede especificar como queremos construir nuestra aplicación.

Para escribir el nuestro propio: https://docs.openshift.com/container-platform/3.3/dev_guide/templates.html#writing-description


# Crear app a partir de un template
oc new-app -f template.yml


# Crear una template a partir de un proyecto existente
https://docs.openshift.com/container-platform/3.3/dev_guide/templates.html#export-as-template



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
Ejemplos para crear aplicaciones en distintos lenguajes / frameworks
https://github.com/openshift?utf8=%E2%9C%93&q=-ex&type=&language=
