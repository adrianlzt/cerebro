# zbx-load-testing

<https://github.com/datadope-io/zbx-load-testing>

App para generar carga.

OJO! No usar resolución DNS para evitar tener otro punto de lantencia y cuello de botella.

CUIDADO! Si usamos una única máquina para testear, es muy posible que lleguemos al límite

Increase local port range

```bash
sudo sysctl -w net.ipv4.ip_local_port_range="1024 65535"
```

Vigilar el "net.tcp.socket.count[,10051,,,time_wait]" mientras hacemos las pruebas.

# zabbix-blackhole

<https://github.com/datadope-io/zabbix-blackhole>

Para simular ser un server/proxy que responde siempre que ha consumido las métricas.
La idea es poder aislar si los problemas son generados por la app que genera carga o por limitaciones del server.

También se puede usar como un zabbix-server y conectarle un proxy.
Tendremos que usar `fetch-config` para obtener la configuración de proxy que queramos y luego arrancarlo.
Cuando un proxy pida su configuración, se le devolverá y a partir de ahí aceptará todas las métricas.

# Usando múltiples zabbix-agent2

Crear una template con 1000 items usando keys:

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

Tenemos menos items de los que en realidad tendría el entorno, facilitando el insert trends (menos items que insertar en los cambios de hora).

Simular con agentes también nos limita más las posibilidades de decidir cuantas alarmas disparar o forzar los cambios de hora.

# Postgres

En postgres vemos un ratio constante de tuplas insertadas equivalente al NVPS.
