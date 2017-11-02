https://medium.com/@knight.joel/why-i-enthusiastically-switched-from-cacti-to-zabbix-for-system-monitoring-2b21e559b373
Using SNMP for data collection is tedious
And I feel like I should know. I’ve written multiple SNMP MIBs and implemented those MIBs in an SNMP agent.
Getting even simple data out of SNMP like “how full is my disk?” can differ between operating systems.
Getting simple data out of SNMP like “how many messages has my SMTP server processed today?” can be downright awful if that simple bit of data isn’t part of an existing, well-known MIB.
And using multiple operating systems means dealing with multiple SNMP agents: OpenBSD has their snmpd(8), FreeBSD has bsnmpd, and pretty much everything else uses Net-SNMP. Each one has their specific nuances and features.
