# Histeresis
http://blog.zabbix.com/no-more-flapping-define-triggers-the-smart-way/1488/

({TRIGGER.VALUE}=0 and {server:temp.last()}>20) or
({TRIGGER.VALUE}=1 and {server:temp.last()}>15)

Se activa si pasa de 20. Se desactiva si baja de 15


# Booleanos
{Escalada:web.test.error[Beta 8a].last()}=1 or {Escalada:web.test.fail[8anu Tiempo].last()}=1


# Matematicas
({server1:system.cpu.load[all,avg1].last()}>5) + ({server2:system.cpu.load[all,avg1].last()}>5) + ({server3:system.cpu.load[all,avg1].last()}>5)>=2


# Monitorizar todos los paramaetros de un item
https://serverfault.com/questions/701332/can-i-create-a-zabbix-item-which-tracks-the-cksum-of-a-file-with-a-slightly-vary
Parece que hace falta crearse un custom low-level discovery.
