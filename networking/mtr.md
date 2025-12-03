Ping + traceroute

Nos muestra la ruta hasta el destino haciendo ping a cada uno de los pasos.
Usa interfaz ncurses.

# Arch

```bash
pacman -S mtr
yum install -y mtr
```

# Uso

```bash
mtr www.google.es
```

Generar un reporte (tras 10 peticiones)

```bash
mtr -rnc 10 www.google.es

# -r reporte
# -c numero de peticiones
# -n no resolver dns
```

También podemos enviar tráfico UDP o TCP. Ejemplo para TCP:

```bash
mtr -T -P 80 1.1.1.1
```

# tracepath

Si un resultado muestra "asymm" quiere decir que el camino de ida y vuelta han sido distintos. El número que sigue es cuantos "hops" han sido distintos.

# tracepath vs traceroute

tracepath no necesita permisos root
traceroute necesita permisos root porque modifica los paquetes raw

A cambio, traceroute tiene más flexibilidad en la configuraión.
<https://askubuntu.com/questions/114264/what-are-the-significant-differences-between-tracepath-and-traceroute>
