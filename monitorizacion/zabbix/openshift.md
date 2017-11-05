Ideas monitorizando Openshift de manera dinámica con LDD.

DUDA: que hacer, crear uno/varios items por cada service asociados todos al mismo host? Es decir, un host por namespace con todos los services colgando.
O crear un host por cada service y dentro de ese service los items que chequean ese service?

Tal vez esto dependa de cuantos items queremos monitorizar por service.
Si es solo un "check http" tal vez tenga más sentido un host para todos los services.

Si escogemos la segunda opción (multiples hosts) tambíen tendremos el problema que cada host deberá llamar al script de autodiscover para obtener la IP y el puerto, ya que el primer autodiscover no puede pasar esta información hacia el host (o no se como, en el prototype de host no hay opciones de este tipo)


Una mejor agrupación es asociar los mismos elementos de una aplicación de openshift (según etiqueta label), bajo la misma aplicación de openshift.

En resumen es, un nodo para todos los recursos de un proyecto de openshift.
Uno, o varios items, por cada recurso (check http para service, check de mem, cpu, disco para pods, etc).
Los recursos agrupados en aplicaciones según su label "app".


Para poder lanzar los items a las ips de servicios y pods, zabbix proxy dentro de openshift para usar los "External check".
O un zabbix agent en cada proyecto usando net.tcp.service?



# Que items crear para los pods y services?

Para los services puede que simplemente el check http sea suficiente.
Pero, y si alguien quiere por ejemplo el check http con basic auth?

Para los pods, como meter items de memoria, cpu, disco?
zabbix trappers y alimentarlos externamente?
Si queremos meter alarmas por log. Crear manualmente los nuevos items como zabbix trappers y alimentarlos con logstash?

Usar scripts externos para recuperar esa informacion? No parece buena idea, no parece que vaya a escalar bien tanto forkeo de procesos.
Modulo interno de zabbix? Tal vez sea una opción, pero puede que el desarrollo sea costoso.




# Despliegue de zabbix sobre openshift



# Monitoring zabbix
Scripts usados por openshift.com para monitorizar su plataforma
https://blog.openshift.com/build-monitoring-solution-look-openshift-tools/
https://github.com/openshift/openshift-tools
https://github.com/openshift/openshift_zabbix


https://github.com/wkulhanek/openshift-zabbix
Despliegue con ansible de agentes zabbix sobre los nodos para realizar una monitorización de la plataforma.
A parte de lo típico que puede monitorizar, mete unos chequeos custom (UserParameter) para obtener el número de containers, corriendo, info sobre los volumenes LVM.
También un pequeño script que obtiene métricas de hawkular sobre los nodos de openshift.
