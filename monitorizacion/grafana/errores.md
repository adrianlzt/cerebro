No puede correr en el puerto 80.
Dar permisos:
setcap 'cap_net_bind_service=+ep' /usr/sbin/grafana-server



t=2017-04-22T16:51:07-0500 lvl=eror msg="Fail to start server" logger=server error="open : no such file or directory"
He puesto SSL pero me falta poner el cert y la key
