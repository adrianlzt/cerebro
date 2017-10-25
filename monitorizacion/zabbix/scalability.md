https://www.zabbix.com/documentation/4.0/manual/installation/requirements
Pequeña tabla con ejemplos de hardware para distintos tamaños de instalación.


http://blog.zabbix.com/scalable-zabbix-lessons-on-hitting-9400-nvps/2615/
https://kloczek.wordpress.com/2016/05/05/punching-2k-selects-barrier-on-zabbix-mysql-db-backend/


NVPS: new values per second


"if someone is observing own zabbix DB backend IO read/write ratio on storage layer bigger tahn 1/20 - 1/100, it probably means that this install needs more memory for server caches and/or DB cash and/or zfs ARC
discussion_new_backends.png (Abril 2015)
https://www.linkedin.com/groups/161448/161448-5996549505196048385

En esta discusión se tocan más temas para como hacer zabbix más "performant"


Parece que una típica mejora ante instalaciones muy grandes es poner los agentes en "active monitoring"



https://www.zabbix.com/forum/showpost.php?p=184441&postcount=6
Way bigger problem is with all queries generating all WRITE IOs (inserts and updates).
If someone has bigger and bigger scalability problems with zabbix DB backend way bigger improvements is possible to gain by stop using Linux and switching to Solaris (ZFS ARC)


https://support.zabbix.com/browse/ZBXNEXT-714
need scalable alternative for the history and items tables



# Stress test
https://github.com/vulogov/zas_agent/blob/master/doc/zas-agent-0.1.1.pdf
ZAS: zabbix agent simulator
Software que simular ser un agente para poder realizar test sobre la infraestructura

