## Ubuntu ##
https://help.ubuntu.com/community/IptablesHowTo#Saving_iptables

Tres ideas:

1. En la definición de la interfaz (iface ethX...)
2. En /etc/network/if-pre-up.d and ../if-post-down.d
3. Instalando el paquete iptables-persistent
  En la instalación nos pregunta si queremos guardar las reglas actuales en el fichero para que persistan.
  Si queremos reglas persistentes, las metemos con: iptables-save > /etc/iptables/rules.v4 (.v6 para IPv6)

## RedHat ##
iptables-save > /etc/sysconfig/iptables
