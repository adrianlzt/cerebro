http://people.seas.harvard.edu/~apw/stress/

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

