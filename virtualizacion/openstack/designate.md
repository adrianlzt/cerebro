https://launchpad.net/designate/
https://wiki.openstack.org/wiki/Designate
http://docs.openstack.org/developer/designate/
https://github.com/openstack/designate

Designate is comprised of four main components Designate API, Designate Central, Designate MiniDNS, and Designate Pool Manager, supported by a few standard open source components. For more information see Architecture

Parece que en la api v1 los domains son los recordsets de la api v2

# Administracion
Mostrar configuración de los pools (servidores DNS sincronizados con designate):
designate-manage pool show_config

## Zone transfers
Para ver como está un dominio podemos solicitar un AXFR al mDNS
dig tenant.dominio. AXFR @127.0.0.1

# API
http://docs.openstack.org/developer/designate/rest.html#rest

These headers work for all APIs
X-Designate-Edit-Managed-Records
  Allows admins (or users with the right role) to modify managed records (records created by designate-sink / reverse floating ip API)
X-Auth-All-Projects
  Allows admins (or users with the right role) to view and edit zones / recordsets for all tenants
X-Auth-Sudo-Tenant-ID / X-Auth-Sudo-Project-ID
  Allows admins (or users with the right role) to impersonate another tenant specified by this header

Obtener zonas
curl -H 'X-Auth-Token: a14c1d062a00425dbba917025612ff63' -H 'Accept: application/json' -H 'Content-Type: application/json' http://localhost:9001/v2/zones | python -m json.tool

Obtener dominios (recordsets) para una zona determinada:
http://docs.openstack.org/developer/designate/rest/v2/recordsets.html#create-record-set-a-aaaa-cname-ns-and-txt
curl -H 'X-Auth-Token: a14c1d062a00425dbba917025612ff63' -H 'Accept: application/json' -H 'Content-Type: application/json' http://127.0.0.1:9001/v2/zones/c7d8f62a-6bd2-46d4-8047-3bdcf8132efc/recordsets | python -m json.tool

Lo importante es el nombre, los records y el tipo.

Ejemplo de respuesta de uno de los elementos (solo campos importantes):
        {   
            "name": "test2.pruebaenero.ost2.hi.inet.",
            "records": [
                "192.169.1.11"
            ],
            "status": "ACTIVE",
            "type": "A",
        }


# Arquitectura
http://docs.openstack.org/developer/designate/architecture.html#architecture

## API
La API recibe peticiones HTTP.
Las valida contra keystone.
Pasa las peticiones a designate-central via AMQP (rabbit)


## Central
Central hace el almacenamiento persistente en SQL o Mongo (MySQL) y tiene la lógica.
  En la base de datos se almacenan:
    los dominios, tenant asociado, email, ttl, refresh, retry, status, reverse name, etc (los dominios son los asociados a los tenants)
    name servers records
    records (parece el formato con el que se generan las zonas en bind) (esto es nombre de host + nombre de red + dominio/tenant)
    tambien un par de tablas para las zone transfers requeridas y aceptadas

## mDNS
https://github.com/openstack/designate/tree/master/designate/mdns
https://github.com/openstack/designate/blob/master/designate/cmd/mdns.py

Envia DNS NOTIFY y contesta las peticiones AXFR (zone transfers).
Estos dos métodos permiten a designate sincronizarse con cualquier servidor DNS que soporte estos sistemas.
También gestiona cosas del protocolo DNS que necesita desginate (como hacer querys a SOAs para comprobar que se ha producido un cambio)

## Pool manager
Gestiona el estado y sincronización de los servidores DNS que está usando designate.
Por ejemplo, un Bind9 y un PowerDNS donde estamos insertando los dominios de ost.
Puede dividir los servidores en Pools para que las zonas de designate puedan repartirse en diferentes sets de servidores dns (no entiendo muy bien esta parte)

## Sink
Escucha eventos de Nova y Neutron para gestionar la creación y borrado de registros.
Los handlers son las partes que van en Neutron y Nova para recoger estos eventos.

La implementación actual de Sink solo permite generar registros A según la configuración en handler-nova.

Se puede usar cualquier dato en el evento de notificación para generar el record.

Configuración en /etc/designate/designate.conf
[service:sink]

Aqui definimos los handlers para leer eventos de nova y neutron (enabled_notification_handlers)

Los handlers están definidos en https://github.com/openstack/designate/tree/2015.1.0/designate/notification_handler

Aqui es donde se pasa los eventos a los handlers:
https://github.com/openstack/designate/blob/2015.1.0/designate/sink/service.py#L116

### Nova
El exchange donde debe escuchar está definido en el designate.conf
exchange=nova topic=notifications_designate
El exchange nova es tipo topic, por lo que el handler de nova se subscribe filtrando por el topic "notifications_designate"

Escucha los eventos:
  compute.instance.create.end
  compute.instance.delete.start

Mirar eventos_amqp.md

## Bakends
Drivers para hablar con los distintos servidores de DNS: BIND, PowerDNS, InfoBlox, NSD, DynECT

## Message Queue
Se utiliza oslo.rpc para comunicarse entre los componentes. Puede usar RabbitMQ, Qpid, ZeroMQ.

## Database / Storage
SQL/NoSQL
Típicamente MySQL

