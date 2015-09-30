http://riemann.io/concepts.html

Each event can contain one of a number of optional fields including: host, service, state, a time and description, a metric value or a TTL. They can also contain custom fields.

Los eventos solo permanecen en riemann durante su TTL.

Si llega otro evento para el mismo host y el mismo service, se borrará automáticamente el que estuviese antes.
service, host, and time: the composite primary key of a logical "thing" in the Riemann universe

Ejemplo:
INFO [2014-12-23 17:23:47,055] pool-1-thread-18 - riemann.config - #riemann.codec.Event{:host riemann.example.com, :service load, :state ok, :description 1-minute load average/core is 0.11, :metric 0.11, :tags nil, :time 1419373427, :ttl 10.0}


# Fields predefinidas
hostA              hostname, e.g. "api1", "foo.com"
service            e.g. "API port 8000 reqs/sec"
state              Any string less than 255 bytes, e.g. "ok", "warning", "critical"
time               The time of the event, in unix epoch seconds
description        Freeform text
tags               Freeform list of strings, e.g. ["rate", "fooproduct", "transient"]
metric             A number associated with this event, e.g. the number of reqs/sec.
ttl                A floating-point time, in seconds, that this event is considered valid for. Expired states may be removed from the index.


# Custom fields
http://riemann.io/howto.html#custom-event-attributes

Parece que pueden ralentizar un poco riemann.
Para usar where:
  (where (= (:type event) "evolution")

