https://github.com/facebookincubator/below
https://developers.facebook.com/blog/post/2021/09/21/below-time-travelling-resource-monitoring-tool/?ck_subscriber_id=185276597

Como un atop moderno.
Tiene un demonio que va almacenando métricas y una interfaz similar a htop para consultarlas.

Hace uso de eBPF para no perderse los short lived procs.

# Install arch

aur/below

También podemos sacar el binario del contenedor, aunque podrá dar problemas al no ser estático.

# Docker

```bash
podman run --rm --privileged --cgroupns=host --pid=host -it docker.io/below/below:latest
```

Arrancar en modo record y luego conectar para ver los datos:

```bash
 docker run --name below --privileged --cgroupns=host --pid=host -it --entrypoint bash -v "$PWD/below:/below_data" docker.io/below/below:latest -c "echo 'store_dir = \"/below_data\"' > /etc/below.conf && /below --config /etc/below.conf record"

podman run --name below --privileged --cgroupns=host --pid=host -it --entrypoint bash docker.io/below/below:latest -c "echo 'store_dir = \"/tmp\"' > /etc/below.conf && /below --config /etc/below.conf record"
podman exec -it below /below --config /etc/below.conf replay --time "1m ago"
```

Arrancar un server que va almacenando localmente para poder verlo con replay:

```bash
docker run --name below --privileged --cgroupns=host --pid=host -it --entrypoint bash -v /home/iometrics/below:/below_data docker.io/below/below:latest -c echo 'store_dir = "/below_data"' > /etc/below.conf && /below --config /etc/below.conf record

docker run --rm --name below-replay --privileged --cgroupns=host --pid=host -it --entrypoint bash -v "$PWD/below:/below_data" docker.io/below/below:latest -c "echo 'store_dir = \"/below_data\"' > /etc/below.conf && /below --config /etc/below.conf replay -t \"3m ago\""
```

# Config
sudo systemctl enable --now below

Si queremos recolectar io-stat: --collect-io-stat

# Uso
below live

? mostrar ayuda
q salir de la ayuda

p vista procesos
s vista sistema (métricas detalladas por core, las vmstats, swap, discos)
c vista cgroup, la de por defecto

z, saltar a vista detallada de procesos (en vez de cgroups)

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

Si queremos ver todos los discos, usar la vista de sistema 's'.

Sacando las métricas de un disco para un intervalo determinado:

```bash
below dump disk --begin 1752741908 --duration '2 sec'  --select name -F sdc
```

Sacar todas las métricas de proceso para un PID determinado en JSON:

```bash
below dump process --begin 1752741908 --end 1752742025 --select pid -F 1478282 -O json --everything
```

Sacando unos campos específicos:

```bash
below dump system --begin 1752741908 --end 1752742025 -f vm.pgscan_kswapd -f vm.pgsteal_kswapd
```

Analizar el consumo de memoria:

```bash
below dump system --begin 1752741908 --end 1752742025 -f mem.buffers -f mem.cached -f mem.slab_reclaimable
```

Buscar un slab idx:

```bash
for i in $(seq 0 300); do echo -n "$i - "; docker exec -it below-replay /below --config /etc/below.conf dump system --begin 1752741908 --end 1752741910 -f slab.$i.name | grep -v Name; done | grep dentry
```

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
