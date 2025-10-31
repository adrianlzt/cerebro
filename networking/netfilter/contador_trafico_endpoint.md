Para saber cuanto tráfico estamos enviando a un endpoint determinado podemos usar iptables:

```bash
iptables -A OUTPUT -p tcp --dport $ENDPOINT_PORT -d $ENDPOINT_IP -j ACCEPT
while true; do
  date
 iptables -vL OUTPUT -Z
 sleep 5
done
```

Quitar la regla:

```bash
iptables -D OUTPUT -p tcp --dport $ENDPOINT_PORT -d $ENDPOINT_IP -j ACCEPT
```

Ejemplo de output:

```
Chain OUTPUT (policy ACCEPT 16303 packets, 107M bytes)
 pkts bytes target     prot opt in     out     source               destination
    0     0 ACCEPT     tcp  --  any    any     anywhere             20.60.100.43         tcp dpt:https
    0     0 ACCEPT     tcp  --  any    any     anywhere             20.60.99.171         tcp dpt:https
 1138   55M ACCEPT     tcp  --  any    any     anywhere             20.60.100.235        tcp dpt:https
```

Lo que pone en la linea de "Chain OUTPUT" es todo el tráfico saliente por esa cadena.
Luego en cada una de las reglas tendremos el tráfico por las distintas reglas que hayamos puesto.
