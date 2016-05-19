Listar:
iptables -S
iptables -L
iptables -L -v  -> mostrar numero de paquetes procesados en cada regla
iptables -t nat -S
iptables -t mangle -L


Borrar:
iptables -F // Borra tabla filter
iptables -t tabla -F [FORWARD/INPUT/OUTPUT]

	borrar determinada regla:
		iptables -t nat -L -n --line-numbers
		iptables -t nat -D PREROUTING 1

		iptables -L -n --line-numbers
		iptables -D FORWARD 3

    Podemos poner la misma regla, pero en vez de con -A con -D

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

Cerrar puerto de entrada
iptables -A INPUT -p tcp --dport 80 -j DROP

Cerrar puerto de salida:
iptables -A OUTPUT -p tcp --dport 45 -j DROP

Cerrar puerto y dirección de salida:
iptables -A OUTPUT -p tcp -d 81.45.59.233 --dport 443 -j DROP


Comprobar si están capturando tráfico las reglas:
iptables -L -v

