Los clusters activo-activo

Para saber si estamos en una instancia que es RAC:

```sql
select name, value from v$parameter where name = 'cluster_database';
```

# Listener

Las database instances se registran en su listener local via el PMON (process monitor).
La información de registro continene:

- host:port
- servicios ofrecidos por la database instance
- instance name and unique ID
- configuraciones de balanceo

Cuando un cliente conecta con un listener, este analiza a donde quiere conectarse y pueden suceder dos cosas:

- si el servicio está localmente, se establece una conexión directa
- si está en un servidor remoto, el listener redirige la conexión al listener del servidor remoto

La conexión, una vez establecida, no depende del listener.

A parte de los listener locales, existen los SCAN listeners (Single Client Access Name).
Estos están asociados a una VIP y pueden correr en cualquier nodo del cluster.

Obtener cuantos SCAN listeners hay y su estado:

```bash
$ srvctl config scan_listener
SCAN Listeners for network 1:
Registration invited nodes:
Registration invited subnets:
Endpoints: TCP:1521
SCAN Listener LISTENER_SCAN1 exists
SCAN Listener is enabled.
SCAN Listener LISTENER_SCAN2 exists
SCAN Listener is enabled.
SCAN Listener LISTENER_SCAN3 exists
SCAN Listener is enabled.
```

```bash
srvctl status scan_listener
SCAN Listener LISTENER_SCAN1 is enabled
SCAN listener LISTENER_SCAN1 is running on node rac1
SCAN Listener LISTENER_SCAN2 is enabled
SCAN listener LISTENER_SCAN2 is running on node rac2
SCAN Listener LISTENER_SCAN3 is enabled
SCAN listener LISTENER_SCAN3 is running on node rac2
```
