# Proxy
TLSConnect=psk
TLSPSKIdentity=zabbix-web01
TLSPSKFile=/etc/zabbix/secret.psk

Generar una PSK
openssl rand -hex 32 > /etc/zabbix/secret.psk

Tendremos que registrar ese proxy en zabbix-web con esa psk e identity
