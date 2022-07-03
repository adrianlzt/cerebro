http://www.certdepot.net/rhel7-get-started-firewalld/
https://fedoraproject.org/wiki/Firewalld?rd=FirewallD#How_to_configure_or_add_zones.3F


Ver que tenemos:
firewall-cmd --list-all

Abrir el firewall sin restricción:
firewall-cmd --set-default-zone=trusted


firewalld.noarch : A firewall daemon with D-BUS interface providing a dynamic firewall

Integra iptables, iptables6 y eftables
Conf en XML
Pre-defined templates

Logging menos críptico

Union con NFS con SELinux

No usar con iptables.
No hace falta reiniciar.


Si tenemos varias interfaces activar el forwarding:
/etc/sysctl.conf
net.ipv4.ip_forward=1

sysctl -p




Programas de gestión:
firewall-config (gráfica)
firewall-cmd
  Estos se conectan al firewalld, que habla con iptables que habla con kernel.

Reglas nuestras
/etc/firewalld/

# Conceptos
Zones, services, connections

Se asigna cada interfaz a una zona.
Zonas predefinidas:
  drop
  block
  public
  external
  dmz
  work
  home
  internal
  trusted

# Firewall-cmd
Al añadir cambios, si queremos que sean permanentes meteremos:
  --permanent

## Status
  --state              Return and print firewalld state
  --reload             Reload firewall and keep state information
  --complete-reload    Reload firewall and loose state information
                       pierde info sobre conexiones establecidas
                       necesario si alguien tocó el iptables directamente
  --runtime-to-permanent
                       Create permanent from runtime configuration

firewall-cmd --list-all
  muestra zonas activas y que tienen configuradas.

## Zonas
Por defecto todas las interfaces están unidas a la default zone
firewall-cmd --get-default-zone

Para cambiarla:
firewall-cmd --set-default-zone=

Zonas activas (que se estén usando en alguna interfaz):
firewall-cmd --get-active-zones

Todas las zonas predefinidas:
firewall-cmd --get-zones

Todas las zonas predefinidas explicando las características de cada una:
firewall-cmd --list-all-zones

Info de una en particular:
firewall-cmd --list-all --zone=internal

Zona de una interfaz:
firewall-cmd --get-zone-of-interface=<interface>

Crear zona:
firewall-cmd --new-zone=docker --permanent
firewall-cmd --reload

Añadir una interfaz a una zona:
firewall-cmd --zone=docker --permanent --add-interface=docker0



## Servicios / Puertos
Servicios predefinidos
firewall-cmd --get-services

Listar puertos abiertos:
firewall-cmd --zone=internal --list-ports

Listar servicios abiertos:
firewall-cmd --list-services


Añadir un servicio (abrir un puerto) a una zona (si no le pasamos nada, la de por defecto):
  RECORDAR lo de --permanent

firewall-cmd --add-service=http
firewall-cmd --add-service=http --zone=home

firewall-cmd --add-port=45/tcp
firewall-cmd --add-port=50-55/tcp
firewall-cmd --add-port=50/tcp --add-port=60/tcp

Creo que hace falta recargar para coger la conf:
firewall-cmd --reload


## Services
Ficheros XML que asocian un nombre a una serie de puertos
Los predefinidos se encuentran en /usr/lib/firewalld/services
Si queremos crear uno propio cogeremos uno de los predefeinidos, lo modificaremos y pondremos en: /etc/firewalld/services


## Rich rules
https://fedoraproject.org/wiki/Features/FirewalldRichLanguage#Documentation
man firewalld.richlanguage

Listar rich rules:
firewall-cmd --list-rich-rules

Allow new IPv4 connections from address 192.168.0.0/24 for service tftp and log 1 per minutes using syslog
firewall-cmd --add-rich-rule='rule family="ipv4" source address="192.168.0.0/24" service name="tftp" log prefix="tftp" level="info" limit value="1/m" accept'

Forward IPv6 port/packets receiving from 1:2:3:4:6:: on port 4011 with protocol tcp to 1::2:3:4:7 on port 4012
firewall-cmd --add-rich-rule='rule family="ipv6" source address="1:2:3:4:6::" forward-port to-addr="1::2:3:4:7" to-port="4012" protocol="tcp" port="4011"'



# Errores
Make sure polkit agent is running or run the application as superuser.
 -> sudo firewall-cmd ...
