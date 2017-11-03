https://www.zabbix.com/documentation/3.4/manual/concepts/agent

Zabbix agent is deployed on a monitoring target to actively monitor local resources and applications (hard drives, memory, processor statistics etc).
The agent gathers operational information locally and reports data to Zabbix server for further processing.
Corre como no root

sender.md para utilidad standalone para enviar resultados
get.md para testear agentes

# Active / Passive
In a passive check the agent responds to a data request. Zabbix server (or proxy) asks for data, for example, CPU load, and Zabbix agent sends back the result.
Active checks require more complex processing. The agent must first retrieve a list of items from Zabbix server for independent processing. Then it will periodically send new values to the server.

Passive Agent <--- Server
Active: Agent ---> Server


# Install
Arch: pacman -Ss zabbix-agent

# Config
https://www.zabbix.com/documentation/3.4/manual/appendix/config/zabbix_agentd

/etc/zabbix/zabbix_agentd.conf

Server=
  parametro para decir que servidores de zabbix nos pueden solicitar métricas
