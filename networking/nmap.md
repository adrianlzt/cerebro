http://www.cyberciti.biz/networking/nmap-command-examples-tutorials/

Escaner de red.

# Sondeos
-sS
  SYN

-sT
  tcp connect

-sP
  ping

-sV
  obtener servicios y sus versiones


Escaneo de una red para ver que ips contestan
nmap -sP x.x.x.x/a

Escaneo de red descubriendo SO
nmap -sS -O 192.168.1.1/24

Escaneo de una red en busca de un puerto ssh abierto:
nmap -p 22 192.168.1.1/24

Escanear una red:
nmap 192.168.55.*



# Escaneo de puertos

## TCP
nmap 127.0.0.1 -p 80

Envia un paquete SYN al puerto.
Si el server, o u firewall en medio, rechaza el paquete:
  ICMP - Destination unreachable (Port unreachable)
nmap no devuelve:
  STATE: filtered

iptables devuelve este mensaje (si está configurado como REJECT).
Otros firewall pueden devolver:
  ICMP - Destination unreachable  (Host administratively prohibited)

Si iptables está configurado como DROP contesta igual:
  STATE: filtered

En caso de estar cerrado el SO contesta con un TCP [RST,ACK] y es cunado nmap contesta
  STATE: closed

Si NMAP nos dice "Note: Host seems down. If it is really up, but blocking our ping probes" probar con
-Pn

## UDP
Parece que no es fácil comprobar que un puerto UDP está abierto.
