<https://github.com/evilsocket/opensnitch>

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

Las reglas se almacenan en ficheros json en:

```
/etc/opensnitchd/rules
```

# TUI

https://github.com/amalbansode/opensnitch-tui

Tenemos que configurar opensnitchd para que use TCP. opensnitchd intentará conectar al puerto que le digamos, donde deberá estar escuchando esta app o la de opensnitch-ui (usando --socket 127.0.0.1:PUERTO).

Config opensnitchd:
```json
{
    "Server":
    {
        "Address":"127.0.0.1:50051",
```
