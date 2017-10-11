Es un telegraf+influxdb+grafana integrado en una única solución.

Soporta nativamente muchas plataformas: openshift, kubernetes, etc

# Openshift
Tiene visor para los eventos que genera Openshift y puede alarmar según estos eventos.

Se pueden asignar plugins a las imagenes (usando regex) y con esto se generan dashboards automáticamente.
Si, tras hacer la asignación, levantamos un container con nginx, coscale creará automáticamente un dashboard con métricas que saca del endpoint de métricas de nginx.
Soporta muchas tecnologías.


Para instalarlo te permite usar rpms/deb o como containers como DaemonSet.
El container debe tener permisos de admin.


Al instalarlo nos crea varios dashboards por defecto.
Uno genérico de métricas de servidor (cpu, mem, network, swap, disco), con seleccionables para agregar los servidores, seleccińo de tiempo, etc.

Luego también crea unos cuantos sobre el estado del cluster de OpenShift (junto con el widget para mostrar los eventos).
Estos dashboards podemos modificarlos.
Podemos agregar "widgets" con las múltiples métricas que recolecta.


La gestión de usuarios parece un poco básica.


Alertas: por defecto nos mete unas cuantas alarmas (unas 20) y puesto por correo a la cuenta que creamos al inicio.
Luego nos permite crear más alertas:
  - eventos/metricas threshold
  - forecast, comparación entre el valor actual y el valor estimado
  - anomalías

Solo tienen un nivel de criticidad (activa o no)

Las notificaciones pueden ser email, slack, HTTP, etc

Sobre las gráficas detecta automáticamente anomalías. Las marca con una barra roja en todas las gráficas y al pincharle nos dice de que anomalía se trata.
Por ejemplo, estamos mirando una gráfica de latencia y vemos la barra roja indicando que en un periodo de tiempo hubo una anomalía que implicaba un crecimiento en el consumo de ram muy alto.


# Checks
http://docs.coscale.com/custom-metrics/generic-script/index/
The generic script plugin can execute a script on your server. Your script can return some custom metrics and our agent will then push the data to the CoScale API.
