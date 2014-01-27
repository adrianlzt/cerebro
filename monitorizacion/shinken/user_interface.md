There are open-source and commercial web frontends using the Livestatus API or an SQL backend available to suit any needs.

The choice of an interface starts with the method of data exchange: Those based on Livestatus and those based on an SQL backend.

The most responsive interfaces are the native WebUI and those based on Livestatus. The most scalable and flexible are those based on Livestatus.


Shinken WebUI -> Not meant for distributed deployments or scalability.


Livestatus based interfaces (Networked API):
  Thruk: is perl/PHP based UI that is very feature complete which also provides some scalability
  Multisite: For maximum scalability, intuitive UI and a solid feature set. shinken lo instala en /usr/local/check_mk/

Otros complementos son: graphite, pnp4nagios, nagvis.

