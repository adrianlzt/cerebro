Loguear paquetes reset (tienen activas las flags RST+ACK)
iptables -I INPUT -p tcp --tcp-flags ALL RST,ACK -s 192.168.157.3 -j LOG

Bloquear paquetes de reset enviados por una ip:
iptables -I INPUT -p tcp --tcp-flags ALL RST,ACK -s 192.168.157.3 -j DROP

Bloquear paquetes de datos (PSH+ACK)
iptables -I INPUT -p tcp --tcp-flags ALL PSH,ACK -s 192.168.157.3 -j DROP


--tcp-flags
Seguido por una «!» opcional, y después dos cadenas de indicadores (flags), le permite filtrar dependiendo de ciertos indicadores de TCP. La primera cadena es la máscara: una lista de los indicadores que desea examinar. La segunda cadena indica cuales deben estar activos. Por ejemplo,

 # iptables -A INPUT --protocol tcp --tcp-flags ALL SYN,ACK -j DENY
 Esto indica que deben ser examinados todos los indicadores («ALL» es sinónimo de «SYN,ACK,FIN,RST,URG,PSH»), pero sólo deben estar activos SYN y ACK. Hay otro argumento llamado «NONE», que significa «ningún indicador».
