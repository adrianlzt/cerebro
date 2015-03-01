Borrar:
iptables -F // Borra tabla filter
iptables -t tabla -F [FORWARD/INPUT/OUTPUT]

        borrar determinada regla:
                iptables -t nat -L -n --line-numbers
                iptables -t nat -D PREROUTING 1

                iptables -L -n --line-numbers
                iptables -D FORWARD 3

    Podemos poner la misma regla, pero en vez de con -A con -D

