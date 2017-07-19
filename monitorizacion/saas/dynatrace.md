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
