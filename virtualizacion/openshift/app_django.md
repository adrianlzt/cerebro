https://github.com/openshift/django-ex/blob/master/README.md

git clone https://github.com/openshift/django-ex.git

cd django-ex

openshift/templates/
ahi tenemos templates para desplegar nuestra app sobre openshift.


# Análisis django-postgresql-persistent.json
El fichero tiene primero la configuración (service, bc, dc, etc) para django y luego parecido para la postgresql

DJANGO:
  Secrets para el database user, pass y secret django key
  Service para exponer la web (puerto 8080)
  Ruta para exponer el service
  ImageStream al nombre de la imagen (que hace?)
  BuildConfig
    Coge el código de git $SOURCE_REPOSITORY_URL
    Usa la imagen python:3.5 para hacer un build desde el código
    La imagen construida será un ImageStream con el nombre de nuestra app
    Si hay algún cambio en la imagen base, en la configuración o un webhook (a posteriori deberemos meter el secret generado en github) se disparará el BuildConfig de nuevo
    Como último paso se ejecutará: ./manage.py test
  DeploymentConfig
    Recreate strategy, ante una nueva versión primero se parará el entorno viejo y luego se levantará el nuevo.
    Será lanzando cuando haya cambios en la imagen del proyecto generada en BuildConfig
    Lanzará un pod, este pod contendrá un container, exponiendo el puerto 8080.
    Este pod tendrá checks de readiness y liveness (endpoint /health) y variables de entorno para configurar ddbb, secret y configuracion
    Tiene un parámetro tambien para limitar la memoria

POSTGRESQL:
  volume claim ReadWriteOnce (solo un nodo puede leer/escribir) para la database con un espacio definido por variable
  service para exponer la bbdd (puerto 5432)
  DeploymentConfig
    strategy recreate
    disparada por cambios en la imagen (usa directamente la imagen postgresql:9.5 (no tenemos fase de BuildConfig)
    un pod, montando el volumen antes solicitado, un único container, exponiendo el puerto 5432
    variables de entorno para definie el usuario, pass y db de postgresql
    el volumen, por un lado lo solicitamos y por otro lo montamos en el container
    readiness probe: realiza un select 1 ejecutando el comando "psql"
    liveness probe, check tcp al 5432
    puede limitarse en memoria con variable

Parámetros:
  por último se definen las variables parametrizables, alguna de ellas son obligatorias, otras llevarán valores por defecto
  puede que sean obligatorias y ya lleven el valor por defecto (de hecho parece que es lo típico)
  APPLICATION_DOMAIN: parece que es por si tenemos un dominio custom, por ejemplo midominio.com



# Crear la app en Openshift
Típicamente nos clonaremos el repositorio oficial en un repositorio nuestro, haremos los cambios necesarios y luego desplegaremos la aplicación, con el template original, apuntando a nuestro repositorio.

oc new-app openshift/templates/django.json -p NAME=nuestrapp -p SOURCE_REPOSITORY_URL=https://github.com/nombre/repo

https://openshift-epg.hi.inet/oapi/v1/namespaces/gbv390/buildconfigs/django-psql-persistent/webhooks/RmycYrSwwF01t2wn0GAql6anmgBYY3dNvt3WnLWV/github
psql: django:DJFvE472QJ2cRn7K


PROBAR
Poner mal las probes
Limitar mucha la memoria (limitación por pod o en total)?
que pasa si intento escalar el pod de ddbb?
repository url con git://?
probar dominio customizado, meter en mi /etc/hosts
