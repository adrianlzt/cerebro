Creo que lo más sencillo para hacer pruebas de carga es crear una template con 1000 items usando keys:

```
net.tcp.port[127.0.0.1,N]
```

Configurar el autoregister de hosts linkados a esa template.

Luego arrancar muchos agentes.
Cada agente consume unos ~50MiB usando esa template básica.
El load si que puede ser bastante grande.
En una máquina con 64 cores, arranacando 500 agentes, cada 20 minutos sucede algo que lleva la máquina a 3000 de load durante 5 minutos.
Seguramente ayudaría arrancar los agentes repartiendo su arranque a lo largo de un minuto.

Con 500 agentes y esa template de 1000 items con interval de 5s, me genera 100kNVPS, cuadrando perfectamente con el teórico.

Esto no es muy justo, porque tenemos menos items de los que en realidad tendría el entorno, facilitando el insert trends (menos items que insertar en los cambios de hora).

Intenté (/home/adrian/Documentos/datadope/zabbix/zbx-load-testing) crear una app para generar carga, pero al final es más complicado gestionar que los datos se envían correctamente.
Al cabo de los minutos los NVPS empezaban a variar mucho, parece porque se empezaban a sincronizar los envíos.

# Postgres

En postgres vemos un ratio constante de tuplas insertadas equivalente al NVPS.
