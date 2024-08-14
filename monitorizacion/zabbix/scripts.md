Podemos definir scripts para ejecutar sobre la vista de usuario de zabbix.
Por ejemplo, un command que hace un ping sobre el servidor.

Estos comandos pueden ejecutarse de distintas maneras, una es sobre el zabbix-server o proxy que esté configurado el servidor.

Bug en la 6.4 y 7.0 que permitía a un admin inyectar scripts al llamar al ping modificando el DNS de un host (a través de una macro).
Se corrige en la 6.4 con el commit 165b14713ae505fd265e92edb4bf63bf2e1b37e4.
