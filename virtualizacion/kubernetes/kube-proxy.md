Distintos tipos de implementación.

Problemas sobre estos tipos: fosdem 2020, Evolution of kube-proxy

userland (antigua): tráfico -> iptables -> kube-proxy -> app

iptables (la común hoy en dia): tráfico -> iptables -> app
Problemas en clusters grandes, 20k services -> 4h para modificar las reglas

ipvs
mirar networking/ipvs.md
Se despliega un ipvs por service.
Funciona bien en escala.
No tiene exactamente todos la funcionalidad de iptables.
Puede necesitar tuneo
Pequeños problemas si el container no envía el FIN, no se borra el registro hasta el timeout.
Mal para DNS (no tiene graceful termination para UDP)
