Si en el log vemos algo como:
Jul 30 18:21:33 [5322] SS01P       crmd:  warning: update_failcount:  Updating failcount for splunk_VP05P on SS01P after failed stop: rc=1 (update=INFINITY, time=1375201293)

Podemos comprobar que ha asignado ese valor con:
crm(live)resource# failcount splunk_VP05P show SS01P 

Y podemos resetearlo con:
crm(live)resource# failcount splunk_VP05P delete SS01P


