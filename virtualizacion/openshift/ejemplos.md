https://docs.openshift.com/container-platform/latest/dev_guide/application_lifecycle/new_app.html#specifying-a-template
https://docs.openshift.com/container-platform/latest/dev_guide/templates.html
Es de OpenShift, no de kubernetes (kubernetes tambien tiene el suyo propio, pero con menos cosas disponibles).

Tambien podemos pasar a "new-app" un fichero yaml o json con la especificación de nuestra app (describes how OpenShift should run this docker image such as where to pull the docker image from, any persistent storage volumes required, ports to expose and other deployment information).
Aquí se puede especificar como queremos construir nuestra aplicación.

Para escribir el nuestro propio: https://docs.openshift.com/container-platform/3.3/dev_guide/templates.html#writing-description
Usar mejor JSON (en YAML tenemos problemas con caracteres raros / -, etc)

Generalmente el admin de la plataforma creará un proyecto (normalmente llamado "openshift") donde almacenará los templates que pueden usar los usuarios. Para consultar los disponibles:
oc get template -n openshift


# Crear app a partir de un template
oc new-app -f template.yml --param=PARAM1=VAL1

Consultar los parametros de un template:
oc process --parameters -f <filename>

Generar un JSON con el template poniendo cada parametro en su sitio:
oc process -f <filename> PARAM1=VAL1 PARAM2=VAL2

Podemos generar ahora los objetos asi (o usar el new-app):
oc process -f <filename> | oc create -f -


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
https://github.com/openshift/origin/tree/master/examples


Ejemplos para crear aplicaciones en distintos lenguajes / frameworks
https://github.com/openshift?utf8=%E2%9C%93&q=-ex&type=&language=



## Service

- apiVersion: v1
  kind: Service
  metadata:
    name: recreate-example
  spec:
    ports:
    - port: 8080
      targetPort: 8080
    selector:
      deploymentconfig: recreate-example

### Con node port
- apiVersion: v1
  kind: Service
  metadata:
    name: "{REDIS_NAME}"
  spec:
    ports:
    - name: redis
      nodePort: 0
      port: 6379
      protocol: TCP
      targetPort: 6379
    selector:
      name: "${DATABASE_SERVICE_NAME}"
    sessionAffinity: None
    type: ClusterIP

