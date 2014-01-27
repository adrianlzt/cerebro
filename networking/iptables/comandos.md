Listar:
iptables -S
iptables -L
iptables -L -v  -> mostrar numero de paquetes procesados en cada regla
iptables -t nat -S
iptables -t mangle -L


Borrar:
iptables -F //todo
iptables -t tabla -F [FORWARD/INPUT/OUTPUT]

	borrar determinada regla:
		iptables -t nat -L -n --line-numbers
		iptables -t nat -D PREROUTING 1

		iptables -L -n --line-numbers
		iptables -D FORWARD 3

Acción por defecto de las tablas:


Denega ping:
	De salida:
		iptables -A OUTPUT -p icmp -j REJECT
		Se puede definir un interfaz en particular con -o ethx

	De entrada:
		iptables -A INPUT -p icmp -j REJECT
		Se puede definir un interfaz en particular con -i ethx


Abrir puertos:
iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT

Cerrar puerto de salida:
iptables -A OUTPUT -p tcp --dport 45 -j DROP


Comprobar si están capturando tráfico las reglas:
iptables -L -v

