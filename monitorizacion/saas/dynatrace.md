https://www.dynatrace.es/

Software de monitorización.
Integrable con Openshift

SaaS
Instalamos agentes que envían los datos a sus datacenters


On-Premises / Managed
Instalamos Dynatrace en nuestros propios servers
https://www.dynatrace.com/trial/managed/


# Agentes

## OneAgent
Nos bajamos un sh que realiza la instalacion
La config ya va metida en este .sh
Crea el user dtuser
Config: /opt/dynatrace/oneagent/agent/conf/ruxitagent.conf

Se ejecutará el agente (como root):
/opt/dynatrace/oneagent/agent/lib64/oneagentwatchdog
Este a su vez lanzará varios procesos (algunos como root otros como dtuser):
/opt/dynatrace/oneagent/agent/lib64/oneagentos
oneagentnetwork
oneagentloganalytics
oneagentplugin

### Plugins
Parece que los plugins están escritos en diferentes lenguajes:
plugin/plugins/ruxit.python.couchdb
plugin/plugins/ruxit.jmx.appserver
plugin/plugins/ruxit.perfmon.dotnetV4
plugin/plugins/ruxit.pmi.appserver
Lleva incrustado un python3.5 oneagent/agent/plugin/python64/python3.5

En cada directorio de cada plugin llevará las dependencias que necesite para ejecutarse (al menos con python)

En cada directorio de cada plugin llevará las dependencias que necesite para ejecutarse (al menos con python)

Por cada plugin lleva un plugin.json donde se describen sus metadatos y las métricas que genera


# Openshift
https://blog.openshift.com/author/dynatrace/
https://blog.openshift.com/openshift-ecosystem-monitoring-openshift-apps-with-dynatrace/
https://www.dynatrace.com/technologies/cloud-and-microservices/openshift-monitoring/

## Agente
Se instala el OneAgent en todos los nodos (se puede desplegar con un ansible role que proveen https://galaxy.ansible.com/Dynatrace/OneAgent/)
El ansible es bastante tonto, solo se baja un .sh de aqui https://{{env_id}}.live.dynatrace.com/installer/oneagent/unix/latest/{{tenant_token}} y lo ejecuta
(El dominio cambia si tienemos un dynatrace desplegado internamente)

Otra opción (menos recomendable según ellos) es desplegar el agente como un container. Este container tendrá privilegios, así que será equivalente a tenerlo instalado en los hosts.
Instalar como DaemonSet: https://help.dynatrace.com/infrastructure-monitoring/containers/how-do-i-monitor-openshift-container-platform/

Si no tenemos acceso a la plataforma (usamos openshift online por ejemplo), podemos meter el OneAgent for PaaS en cada una de nuestras aplicaciones desplegadas.


## Como funciona
Parece que modifica las apps para poner un OneAgent for PaaS dentro de cada pod que esté corriendo. (ToDo: mirar si es asi)
Añadirá cabeceras a los paquetes para poder seguirlos por nuestra aplicación (de los FE a los BE, databases, etc)
Como sigue la relación entre un paquete que entra en un microservicio y los paquetes que salen de ese microservicio no queda claro como lo hacen.

/opt/dynatrace/oneagent/log/oneagenthelper.log
2017-08-03 10:11:32 UTC [105174] info    [docker    ] pid 14664: Injecting into container k8s_scipy-notebook.88cdb24a_scipy-notebook-1-r408t_epg-inventario_efcee0ff-6b88-11e7-89ec-005056a24ea1_d2e51475 (id: 25ade7d12b9793576e0ae246fd01976c42b07e6d755d6528573

A partir de un daemon set se arranca como:
chroot /mnt/root /opt/dynatrace/oneagent/Dynatrace-OneAgent-Linux.sh  DOCKER_ENABLED=1 PROCESSHOOKING=0

## Overhead
Para java (depende, pero en modo general):
  Disco ~20MB
  CPU 1-2%

## Futuro
Meterse en el proceso de CI para testear y detectar malos deploys antes de que lleguen a producción


## Funcionalidades
Auto discovery
Auto baselining (cual es un tiempo de respuesta adecuado?)
Auto problem analysis

Autodetección:
  - como se comunican los procesos
  - como se comunican los servicios
  - obtiene las metricas de response time
  - etc

Vista de que procesos corren nuestro servicio. Que hosts corren esos procesos y que datacenter alojan esos hosts.

Mostrar relaciones entre servicios.
Quien llama a quien. Que porcentaje de cada backend usa cada FE.
Tiempo de respuesta de los FE.
La idea es saber como contribuye cada servicio al tiempo de respuesta global.

Para un servicio ver tiempos de respuesta (mejor percentiles!) y error rate.

Top ten de peticiones con failure rate. Por ejemplo:
  /blabla - 90% error rate
  /coso - 84% error rate

Lo mismo para "Time consuming requests". Serán peticiones que consuman bastante tiempo y se lancen muy amenudo. Por ejemplo, una llamada de 1s que se lanza 100/min

Tambien "Slowest requests", las más lentas en contestar (no tienen porque estar en "Time consuming" si tiene un rate muy bajo)



Una vista específica para mostrar como responde una determinada petición (queries a /blabla por ejemplo).
Desglosa el tiempo total en:
  - iteracciones con colas
  - interacciones con databases
  - ejecucción del código del propio servicio
Muestra el arbol de los métodos que se llaman (es un tomcat) y el porcentaje que cada método contribuye al tiempo total (esto nos puede dar pistas de servicios que deberian ser el mismo, cuando uno llama con un gran porcentaje a otro; siempre será más rápido la comunicación dentro de un proceso que cuando tiene que usar la red para comunicar con otros).


"Problem evolution": cuando sucede un problema van correlando los eventos que tengan que ver y luego muestran un árbol con como afectó el problema.
Parece que dan un botón de "replay" para que podamos ver sobre ese gráfico como se extendió el problema.


Cuando sucede un problema nos detalla cuales son las aplicaciones/servicios/infraestructura afectada (veremos cuantos de cada uno han sido afectados y si hay alguno sin recuperar).
Cuantas aplicaciones han sido impactadas, detallando cual ha sido el impacto: cuantos usuarios, cual ha sido la diferencia en el tiempo de respuesta mientras el impacto y si ha afectado a determinadas secciones (por ejemplo, solo a los usuarios de una determinada zona geográfica, de un navegador determinado, una acción determinada, etc)
Cual ha sido la root cause, por ejemplo un pico de CPU en uno de los containers. O en uno de los nodos de aplicación.
