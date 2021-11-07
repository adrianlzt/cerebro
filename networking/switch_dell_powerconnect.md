Terminal similar a los entornos cisco.

RECORDAR GUARDAR LA CONFIG!!

?
muestras los comandos disponibles

sh ?
muestra las opciones del comando "show"

Para entrar a la config:
config

Para guardar la config:
copy running-config startup-config
https://www.dell.com/support/article/fr/fr/frbsdt1/how10280/how-to-save-and-back-up-your-configuration-on-dell-powerconnect-force10-and-n-series-switches-via-cli?lang=en

Info del sistema (modelo, version, MAC, etc):
sh system


# grep
sh inter | grep TenG


# Logging
show logging
  ver config

Desactivar mensajes de puertos up/down de la consola
conf
logging console errors


# Tabla de MACs - Puerto
show bridge address-table

Si queremos forzar a que un servidor envie tráfico por una interfaz sin ip podemos usar arping:
arping -I enp4s0f1 10.0.1.1

Asi podremos verlo en la tabla de direcciones



# Descripciones de los puertos (definidas a mano)
show interfaces description

Para editar esa descr:
conf
interface ethernet g3
description pepe


# Login
Ver conf
sh auth methods

Local -> usando user y pass
Line -> usando una password definida en la linea para poder acceder

configurar user/pass
aaa authentication login default local
aaa authentication enable default enable

Para el force10 (la password la pasamos en claro pero luego se guarda encriptada)
username Dell password PowerConnect privilege 15


# SSH
https://www.dell.com/support/article/fr/fr/frbsdt1/how10442/how-to-enable-https-ssh-and-disable-http-telnet-for-switch-management-on-powerconnect-5500-series-switches?lang=en
sh ip ssh
  para conocer el estado


Para activar ssh:
conf term
ip ssh server

Tenemos que tener las claves pregeneradas
crypto key generate rsa
crypto key generate dsa


Acceder con pubkey
https://mtu.net/~engstrom/ssh-key-auth-powerconnect/
config
crypto key pubkey-chain ssh
user-key root rsa
key-string AAAA...
  dos veces intro (no pegar la parte de "ssh-rsa" ni el final tipo "blabla@email")

No es muy util, porque siempre tendremos que seguir metiendo user y pass:
http://www.admlife.de/2013/02/06/dell-about-ssh-key-authentication-on-powerconnect-m6220/
https://mtu.net/~engstrom/ssh-key-auth-powerconnect/



# MIBs
Disponible al bajar el firmware de la web de soporte de dell



# Port mirroring / monitoring / duplicacion trafico / tcpdump
Enviar una copia del tráfico de uno o varios puertos a un puerto destino donde podremos ver el tráfico con tcpdump.

Mostrar configuraciones actuales:
show ports monitor

Configurar que el puerto gA duplique su tráfico (rx y tx) en el puerto gB:
config> interface ethernet gB
config-if> port monitor gA

Mientras dure el port monitoring, no llegará el tráfico realmente destinado a gB
Puede que tarde unos segundos (~30) en volver a llegar el trafico tras quitar el port monitor

Para pararlo:
config-if> no port monitor gA


# Desactivar un puerto
config
interface ethernet g17
shutdown

Para activarlo:
no shutdown


# LLDP
https://www.dell.com/support/kbdoc/fr-fr/000120105/how-to-enable-and-manage-link-layer-discovery-protocol-lldp-on-dell-networking-force10-switches?lang=en
