<http://people.seas.harvard.edu/~apw/stress/>

stress-ng tiene un montón más de opciones.

# Arch

pacman -Ss stress

# RHEL (epel)

yum install -y stress

-c, --cpu N        spawn N workers spinning on sqrt()
-i, --io N         spawn N workers spinning on sync()
-m, --vm N         spawn N workers spinning on malloc()/free()
-d, --hdd N        spawn N workers spinning on write()/unlink()

# Uso

Para generar carga en una maquina.

Cargar la maquina a nivel de CPU, IO y memoria durante 60 segundos:
stress --cpu 8 --io 4 --vm 2 --vm-bytes 128M --timeout 60s

Podemos generar cargas de todo tipo, cpu, io, virtual memory, etc.

# stress-ng

Estos dos ejemplos también se comeran una CPU.

* **Consume 2GB of RAM with 4 workers for 60 seconds:**

```bash
stress-ng --vm 4 --vm-bytes 2G --vm-keep --timeout 60s
```

`--vm N`: Start N workers that exhaust virtual memory.
`--vm-bytes SIZE`: Allocate `SIZE` bytes per virtual memory worker (e.g., `2G`, `500M`). If not specified, it tries to exhaust all available memory.
`--vm-keep`: Don't free memory (keep it allocated).
`--timeout SECONDS`: Run for the specified duration.
`--metrics`: Show metrics at the end (useful for analysis).

* **Consume 80% of total RAM:**

```bash
stress-ng --vm 1 --vm-bytes 80% --vm-keep --timeout 300s
```
