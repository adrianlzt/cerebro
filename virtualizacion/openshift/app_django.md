https://github.com/openshift/django-ex/blob/master/README.md

git clone https://github.com/openshift/django-ex.git

cd django-ex

openshift/templates/
ahi tenemos templates para desplegar nuestra app sobre openshift.


# Análisis django-postgresql-persistent.json
Secrets para el database user, pass y secret django key
Un service para exponer la web (puerto 8080)
Una ruta para exponer el service
ImageStream al nombre de la imagen (que hace?)
BuildConfig
  Coge el código de git $SOURCE_REPOSITORY_URL
  Usa la imagen python:3.5 para hacer un build desde el código
  La imagen construida será un ImageStream con el nombre de nuestra app
  Si hay algún cambio en la imagen base, en la configuración o un webhook (necesario configurar el secret) se disparará el BuildConfig de nuevo
  Como último paso se ejecutará: ./manage.py test
DeploymentConfig
  Recreate strategy, ante una nueva versión primero se parará el entorno viejo y luego se levantará el nuevo.
  Será lanzando cuando haya cambios en la imagen del proyecto generada en BuildConfig
  Lanzará un pod, este pod contendrá un container, exponiendo el puerto 8080.
  Este pod tendrá checks de readiness y liveness (endpoint /health) y variables de entorno para configurar ddbb, secret y configuracion
  Tiene un parámetro tambien para limitar la memoria
Volument
  hace un claim de un volumen ReadWriteOnce (solo un nodo puede leer/escribir) para la database con un espacio definido por variable



PROBAR
Poner mal las probes
Limitar mucha la memoria (limitación por pod o en total)?

