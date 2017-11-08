https://docs.openshift.com/container-platform/latest/cli_reference/basic_cli_operations.html
https://github.com/openshift/origin/releases
Código de oc:
https://github.com/openshift/origin/blob/master/cmd/oc/oc.go
https://github.com/openshift/origin/tree/master/pkg/cmd/cli

# Login
oc login https://openshift.company.com/

También podemos pasar un server y un token:
oc --server http://oasdas.com --token asdasda whoami


# Proyectos

## Crear un proyecto (admin)
oc new-project nodejs-echo --display-name="nodejs" --description="Sample Node.js app"
oadm new-project PROYECTO --admin=nombre
  asignar un administrador en la creación del proyecto
  crea tres servieaccounts:
    default, builder, deployer (por orden de menos a más prioridad)

Al crear un proyecto se puede especificar sobre que nodos se van a desplegar.
Esto lo usaremos para evitar que se desplieguen en los nodos de infra por ejemplo.

## Listar proyectos
oc projects

## Info detallada proyecto
oc describe project xxx

## Cambiar de proyecto
oc project xxx



# Estado global
oc status

# Todos los objectos
oc get all
  no muetra todo, al menos, secrets y pvcs no salen.
oc get pvc
oc get secret

# Listar Deployment Configs
oc get dc
  ver todas las cosas que hemos desplegado sobre openshift
  puede que tengamos dc que no sean services (porque no han exportado nada)



# Apps / Deployed Configs / dc

## Listar templates e imagenes disponibles
oc new-app --list

## Crear
https://github.com/openshift/origin/blob/v1.5.0/pkg/cmd/cli/cmd/newapp.go

Usando un template almacenado en github:
oc new-app https://github.com/openshift/golang-ex --name "customname" -l customlabel=value
  para pasar parametros: -p NOMBRE=VALOR (el nombre debe estar todo en minúsculas, puede contener números y guiones)

El nombre que se usará es el nombre del repo "golang-ex".
Asignamos también una etiqueta (-l).

mirar build.md para ver que hace por debajo.




### A partir de imagenes de docker
oc new-app adrianlzt/packagedrone
  creará automáticamente un imagestream con la imagen seleccionada
  un dc con el nombre "packagedrone"
  y un service con el nombre "packagedrone" que será un load balancer a los puertos que declare EXPOSED
  si declara algún volúmen por defecto será no persistente y host-local (se monta un volumen, pisará si había algún dato puesto por la imagen)



Ejemplo de app simple con http: https://github.com/adrianlzt/openshift_python_sample_app.git
Ejecutar con:
oc new-app https://github.com/adrianlzt/openshift_python_sample_app.git

No crea la ruta, la podemos crear con:
oc expose svc/nombreapp

### Dos containers como un solo pod
oc new-app nginx+mysql --name=mydbapp -e MYSQL_ROOT_PASSWORD=root
  mirar kubernetes/internals.md para mas detalle de como funciona esto

oc new-app ruby~https://github.com/openshift/ruby-hello-world mysql --group=ruby+mysql
  otra forma


## Consultar estado
oc describe dc NOMBRE

## Borrar
oc delete all -l app=NOMBRE

oc delete dc NOMBRE
  solo el dc

Para obtener el label app podemos ejecutar:
oc get dc/nombre -o go-template="{{.metadata.labels.app}}"


# Servicios (exponer apps, abrir puertos)
oc get services
  listar

Crear un clusterip
oc create service clusterip NOMBRE --tcp=9999:80
  el selector que decide donde apuntará esta ip será "app=NOMBRE"



# Routes / Expose
Configurar el router (haproxy como proxy inverso) para abrir un endpoint publico para acceder a nuestros services
Puede tardar hasta 30s

oc expose svc/MIAPP
  crea una entrada tipo "http://miprueba-nginx-php-hostname.192.168.99.101.nip.io" apuntando al service "MIAPP"
oc expose service nginx --name=my-route
  nombre de la routa
oc expose svc logging-es --hostname elastic.apps.inet
  definir nombre del dominio

oc create route reencrypt --service logging-es --hostname elastic.apps.inet --dest-ca-cert ../elastic_search/certs_es/admin-ca
  creamos una ruta https que se deshace en el haproxy para volverse a reencriptar hasta el svc logging-es (el cert del svc debe estar firmado por la ca que le estamos pasando)

oc create route passthrough --service logging-es --hostname elastic.apps.inet
  creamos una ruta que pase el trafico TLS directamente hasta el service


## TLS
https://docs.openshift.com/container-platform/3.5/architecture/core_concepts/routes.html#route-types

Edge: TLS terminado en el haproxy
Passthrough: balanceo TCP. Se usa el protocolo TLS-SNI (debe pasarse el hostname en claro).
             El haproxy puede ver a que serer queremos llegar (Host: xxx) y lo reencamina. Puede no funcionar con clientes mmuy antiguos
Re-encryption: se desencripta en el haproxy y se vuelve a enviar encriptado hasta el svc
               Se nos pedirá el certificado CA del destino (del service)


## Rutas TCP
http://cpitman.github.io/openshift/tcp/networking/2016/12/28/tcp-protocols-and-openshift.html#.WedQ6XWAdJ8
A parte del TLS passthrough, se puede usar NodePort o ExternalIPs para pasar tráfico TCP directamente.

ExternalIPs: http://playbooks-rhtconsulting.rhcloud.com/playbooks/operationalizing/ingress.html


# Builds
Lanzar a mano un build
oc start-build NOMBRE
oc start-build --follow --build-loglevel=10 django-psql-persistent


# Pods
oc get pods -o wide
  listar todos
  -o wide
  tambien podemos ver su estado (Running, completed, CrashLoopBackOff)
  -l tag=value
    filtrar pods por un tag
  --all-namespaces
    obtenerlos de todos los namespaces
  -n namespace
    obtener los de este namespace


oc rsh POD
oc rsh -c CONTAINER POD 
  conectar a un pod (como docker exec -it)
  si no especificamos -c, conectará al primer container del pod
  https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/remote_commands.html
  usa nsenter y conecta con el nodo donde está el pod usando HTTP2 o SPDY

Info detallada de un pod
oc describe pod NOMBRE


oc port-forward <pod> 8888:5000
  abrimos el puerto 8888 en la máquina que ejecuta "oc" y se reencamina el tráfico al pod en el puerto 5000
  https://docs.openshift.com/container-platform/3.5/dev_guide/port_forwarding.html#dev-guide-port-forwarding
  usa nsenter y conecta con el nodo donde está el pod usando HTTP2 o SPDY
  
Levantar un pod, mirar run.md




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



# Images
mirar imagestream.md




# Tags
Es como "docker tag" pero aplicado sobre ImageStream

ImageStreamTag (tag de un image stream)  <image_stream_name>:<tag>
ImageStreamImage (imagen de un image stream)  <image_stream_name>@<id>


oc tag <source> <destionation>
oc tag ruby:latest ruby:2.0
  esto crea una tag permanente, apunta a una imagen específica en un momento determinado

oc tag --alias=true <source> <destionation>
  con esto creamos un tracking tag, que sigue a la tag aunque esta cambie (típicos ejemplos los tags stable o latest)

Borrar tag:
oc delete istag/ruby:latest
oc tag -d ruby:latest


# Custom colums
El comando get permite pasar un formato de output customizado
https://kubernetes.io/docs/user-guide/kubectl-overview/#custom-columns

oc get pods <pod-name> -o=custom-columns=NAME:.metadata.name,RSRC:.metadata.resourceVersion
oc get dc/postgresql -o go-template="{{.metadata.labels.app}}"

oc get pod shell-microservice-e-1-xxs54 -o jsonpath="{.status.containerStatuses[0].state.waiting.reason}"
https://kubernetes.io/docs/user-guide/jsonpath/


oc get pod -l component=curator -n logging -o jsonpath="{.items[0].status.containerStatuses[0].ready}"
mirar si el primer pod que matchee component=curator, su primer container esta ready

Obtenemos las conditions del nodo excepto la de "Ready":
$ oc get node ocpa-01.inet -o 'jsonpath={range .status.conditions[?(@.type!="Ready")]}[{.type},{.status}]{end}'
[OutOfDisk,False][MemoryPressure,False][DiskPressure,False]

Obtener el nombre de un pod que, que corre en un nodo especifico y filtrando por una label:
oc get po -l "component=fluentd" -o jsonpath='{range .items[?(@.spec.nodeName=="osh-ma02.inet")]}{.metadata.name}{end}'



oc get aa/bbbb -o yaml
  hacer un dump del elemento en formato yaml


# Edit
oc edit aa/bbb
  editar el yaml del elemento
  si intentamos editar algo que no se puede (inmutable), cuando salgamos del vim se volverá abrir y en la sección de comentarios estará el error



# Explain
oc explain
  consulta al server información sobre este objeto

oc explain route
oc explain route.spec.tls
  con los puntos vamos navegando por la definición del objeto



# Labels
-l key1=value,key2=value
  hace un AND

-l key1=value1 -l key2=value2
  hace un OR


# Prune
oc adm prune xxx
  The commands here allow administrators to manage the older versions of resources on the system by removing them.



# process
Process template into a list of resources specified in filename or stdin 


# create
crear los recursos

# replace
Replace a resource by filename or stdin 

# apply
replace si existe el recurso, create si no existe


# patch
Sobre un objeto queremos realizar un cambio.
Le pasamos un json con el cambio que queremos hacer.
oc patch TIPO OBJECTO -p '{PARCHE}'


# raw
Lanzar peticiones contra un api especificada a mano:
oc get --raw /metrics


# metrics
Consultar las métricas usando oc
oc get --raw /metrics
