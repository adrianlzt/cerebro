https://github.com/facebookincubator/below
https://developers.facebook.com/blog/post/2021/09/21/below-time-travelling-resource-monitoring-tool/?ck_subscriber_id=185276597

Como un atop moderno.
Tiene un demonio que va almacenando métricas y una interfaz similar a htop para consultarlas.

Hace uso de eBPF para no perderse los short lived procs.

# Install arch
aur/below-git

# Config
sudo systemctl enable --now below

# Uso
below live

? mostrar ayuda
q salir de la ayuda

p vista procesos
s vista sistema (métricas detalladas por core, las vmstats, swap, discos)
c vista cgroup, la de por defecto

P sort by pid (process view only)
N sort by name (process view only)
C sort by cpu (cgroup view and process view only)
M sort by memory (cgroup view and process view only)
D sort by total disk activity(cgroup view and process view only)

También podemos ir a cualquier columna con "." y "," y luego:
S ordenar
SS ordernar inversamente


/ buscar
control+l dejar de buscar (borrar el filtro)

tab / shift+tab para moverse por las pestañas (general, cpu, mem, etc)

## Histórico
Acceder a valores del pasado
below replay -t "3m ago"

t: avanzar 10s
T: retroceder 10s

## Short lived procs
Los agrega en el "sample" posterior al proceso terminado.
Por ejemplo, si el proceso se ejecutó a las 00:03 y los bucket saltan de 5 en 5s,
veremos el proceso en el sample 00:05.
En el "state" pondrá DEAD

Mostrar todos los procesos dead entre unas fechas:
sudo below dump process -b 08:40 -e 09:00 --select state --filter DEAD --fields datetime pid ppid comm uptime_secs


# Dump
below dump

Nos permite exportar los datos con diferentes filtrados y formatos.
Potente para hacer scripting
