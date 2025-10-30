Contar cuantas conexiones (paquetes SYN recibidos) se establecen en un puerto:

```bash
iptables -A INPUT -p tcp --syn -j ACCEPT --dport 8087
iptables -vnL INPUT | grep 'dpt:8087'
```

Contar cuantos paquetes cada 10s:

```bash
while true; do sudo iptables -vnL INPUT -Z | grep 'dpt:8087'; sleep 10; done
```

Quitar la regla:

```bash
iptables -A INPUT -p tcp --syn -j ACCEPT --dport 8087
```
