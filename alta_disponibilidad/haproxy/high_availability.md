La arquitectura típica para tener HA será tener dos servidores (activo-pasivo) con VRPP.
Podemos hacer uso de variables de entorno para tener exactamente los mismos ficheros de configuración y en las variables de entorno mantener las divergencias.


Si usamos una VIP configurada por keepalived y queremos hacer bind de haproxy a esa ip, tenemos que configurar sysctl net.ipv4.ip_nonlocal_bind=1.
Esto permitirá a haproxy ponerse a escuchar en la IP de la VIP aunque esta no esté disponible (por ejemplo porque hemos reiniciando y keepalived aún no ha levantado esa ip)
echo "net.ipv4.ip_nonlocal_bind = 1" > /etc/sysctl.d/01-haproxy.conf


Si usamos kubernetes, usar un pod para mete haproxy y keepalived como caddy (container suplementario en el mismo pod)?

# Docker
Container con haproxy + keepalived + seamless reload
adrianlzt/haproxy-keepalived


# Peers
https://cbonte.github.io/haproxy-dconv/2.0/configuration.html#3.5

Podemos tener varias instancias de haproxy distintas y usar "peers" para compartir entre ellas las stick-tables.
