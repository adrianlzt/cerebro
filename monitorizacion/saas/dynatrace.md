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


# Openshift
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
Muestra el arbol de los métodos que se llaman (es un tomcat) y el porcentaje que cada método contribuye al tiempo total.


"Problem evolution": cuando sucede un problema van correlando los eventos que tengan que ver y luego muestran un árbol con como afectó el problema.
Parece que dan un botón de "replay" para que podamos ver sobre ese gráfico como se extendió el problema.
