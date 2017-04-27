https://docs.icinga.com/icinga2/latest/doc/module/icinga2/chapter/distributed-monitoring#distributed-monitoring-setup-master

Configuracion master+stallites+clients

Los checks los manda ejecutar el master a los clientes.

# Configurar el master
icinga2 node wizard

Decirle 'n' a la primera pregunta si estamos configurado el nodo master.
Nos creara los certificados y configuraciones necesarios para poder usar el modulo api.
icinga2 feature enable api
Abre el puerto 5665

service icinga2 restart


# Clients / Agents
Primero debemos generar un ticket en el master para permitir acceso al nodo EJEMPLO:
icinga2 pki ticket --cn EJEMPLO

En el cliente instalaremos el paquete icinga2
yum install -y https://packages.icinga.com/epel/7/release/noarch/icinga-rpm-release-7-1.el7.centos.noarch.rpm
yum install -y https://packages.icinga.com/epel/6/release/noarch/icinga-rpm-release-6-1.el6.noarch.rpm

yum install -y icinga2

Para configurar el cliente ejecutaremos en el:
icinga2 node wizard
Seleccionando la primera opcion 'Y'

El nombre que elijamos aqui para el nodo sera el mismo con el que lo configuraremos en Icinga.

echo 'object Zone "director-global" { global = true }' >> /etc/icinga2/zones.conf

systemctl restart icinga2
service icinga2 restart

