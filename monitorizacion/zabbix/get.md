https://www.zabbix.com/documentation/3.4/manual/concepts/get

Zabbix get is a command line utility which can be used to communicate with Zabbix agent and retrieve required information from the agent.

zabbix_get -s 127.0.0.1 -p 10050 -k system.cpu.load[all,avg1]
