<https://osquery.io/>

interfaz gráfica con info de toda la "flota": <https://github.com/fleetdm/fleet>

mirar tambien grr.md, más para forensic.

osquery (<http://osquery.io/>) is a new open source tool from Facebook that exposes low level details of your system via a familiar SQL interface. Want to query for processes listening on a given network interface? Or for services that launch at startup? This is the tool for you.

c++, muchas dependencias

```bash
osquery> SELECT uid, name FROM listening_ports l, processes p WHERE l.pid=p.pid;

osqueryi # pregunta puntual
osqueryd # preguntas programadas. daemon corriendo. Tambien puede subscribirse a eventos
```

La gran ganancia es que se han encargado de darnos una interfaz común para abstraernos de los comandos en particulares.

Se puede extender via API Thrift
Ejemplos para hacerlo con Go: <https://github.com/kolide/osquery-go>

# Install

## Arch

```bash
yay osquery-bin
```

```bash
systemctl status osqueryd
```

# Uso

## Socket

Si queremos atacar a osquery via socket podemos arrancar osqueryi como:

```bash
sudo osqueryi --extensions_socket /var/run/osqueryi.socket
```

# Queries remotas

Si queremos ejcutar queries remotas debemos usar fleet y lanzar "live queries".

Los osqueryd hacen pooling periódicamente contra el fleet server. Las ejecutarán y enviarán el resultado.

No hay una forma de conectar directamente contra osquery de manera remota, al menos no una segura y "oficial".

# Fleet

Levantamos el server con, por ejemplo, docker-compose.

Luego podemos registrar servidores usando fleetctl (node).

O configurando el osqueryd con el host, token y certificado (hace falta que el cert tenga el CN correcto).

Luego también podemos usar fleetctl para lanzar live queries.

Primero deberemos loguearnos (almacena la config en ~/.fleet/config):

```bash
fleectl login
```

En el fichero de config podemos skipear la verficiación tls.

Lanzar una query:

```bash
fleetctl query --hosts MIHOST --query "select * from processes limit 1"
```
