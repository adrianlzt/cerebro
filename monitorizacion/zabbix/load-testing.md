Creo que lo más sencillo para hacer pruebas de carga es crear una template con 1000 items usando keys:

```
net.tcp.port[127.0.0.1,N]
```

Configurar el autoregister de hosts linkados a esa template.

Luego arrancar muchos agentes.
Cada agente consume unos ~50MiB usando esa template básica.
El load si que puede ser bastante grande.
En una máquina con 64 cores, arranacando 500 agentes en algunos momentos se ha ido a 180 puntos de load. Aunque en general se mantiene sobre 10, cada agente consumiendo un ~4% de cpu.

Con 500 agentes y esa template de 1000 items con interval de 5s, me genera 100kNVPS, cuadrando perfectamente con el teórico.

Intenté (/home/adrian/Documentos/datadope/zabbix/zbx-load-testing) crear una app para generar carga, pero al final es más complicado gestionar que los datos se envían correctamente.
Al cabo de los minutos los NVPS empezaban a variar mucho, parece porque se empezaban a sincronizar los envíos.
