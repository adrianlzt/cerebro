No puede correr en el puerto 80.
Dar permisos:
setcap 'cap_net_bind_service=+ep' /usr/sbin/grafana-server
