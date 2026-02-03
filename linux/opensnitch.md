https://github.com/evilsocket/opensnitch

OpenSnitch is a GNU/Linux interactive application firewall inspired by Little Snitch.

Intercepta todas las conectividades del sistema.
Nos muestra una pantalla donde debemos permitir el tráfico explícitamente.

Hay que activar el daemon:
```bash
systemctl enable --now opensnitchd.service
```

Y tener la UI levantada:
```bash
opensnitch-ui
```

Esta interfaz nos muestra todas las conexiones que se están estableciendo, cuales son aprobadas y cuales se deniegan.
