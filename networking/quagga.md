# Router basado en linux - libre

Entrar en la consola del 'router':
# vtysh

Una vez dentro, para configurar:
hostname# conf term

Configurar una determinada interfaz:
hostname(config)# interface eth0

Publicar un prefijo ipv6
hostname(config-if)# ipv6 nd prefix 2001:XXXX:0:YY::/64
hostname(config-if)# no ipv6 nd suppress-ra
hostname(config-if)# exit
hostname(config)# exit

Escribir la configuración al fichero de configuración /etc/quagga/zebra.conf
hostname# write file
hostname# exit


Fijar rutas estáticamente:
# vtysh
hostname# conf term
hostname(config)# ipv6 route red:de:ipv6::/mascara puer:ta::de:enlace
hostname(config)# exithostname# write file
