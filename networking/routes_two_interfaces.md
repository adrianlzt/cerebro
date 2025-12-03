Mirar también reenrutar_trafico.md

Si tenemos dos interfaces y nos entra un paquete por una de ellas, la vuelta se hará siguiendo las tablas de rutas.

Este suele ser un típico problema donde un paquete entre por la interfaz eth1, pero la tabla de rutas tiene una salida por defecto por eth0.

Para evitar este problema podemos crear una nueva tabla de rutas y asignarla a la ip de eth1.

```bash
ip route add default via 192.168.1.254 dev wlo1 table 200
ip rule add from 192.168.1.44 table 200
```

De esta manera, el tráfico que llegue a 192.168.1.44 será devuelto por las reglas de la tabla 200 (que usan dev wlo1, que es la interfaz de la ip 192.168.1.44).

Una forma fácil de observar el efecto es si tenemos en el pc dos interfaz (típicamente wlan y eth).

Si enrutamos tráfico externo (router abrir puerto) a la interfaz wlan, veremos que llegan las peticiones pero salen por eth.

Si usamos la regla comentada arriba podremos hacer que el tráfico llegue y salga por la wlan.

Si no funciona revisar si el problema es la protección reverse path filter (rp_filter).
Para desactivarlo, /etc/sysctl.conf

```
net.ipv4.conf.default.rp_filter = 2
net.ipv4.conf.all.rp_filter = 2
net.ipv4.conf.eth1.rp_filter = 2
```

# Persistir

```bash
echo "200 zabbix_rt" >> /etc/iproute2/rt_tables
nmcli connection modify eth1 +ipv4.routes "0.0.0.0/0 <GATEWAY_ETH1> table=200"
nmcli connection modify eth1 +ipv4.routing-rules "priority 100 from <IP_ETH1> table 200"
# Si queremos meter alguna excepción
nmcli connection modify eth1 +ipv4.routes "<IP_ZABBIX_SERVER>/32 <GATEWAY_ETH0> table=200"
nmcli connection up eth1
```
