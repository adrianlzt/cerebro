https://github.com/osrg/gobgp

Implementación del protocolo bgp en go

El demonio (gobgpd) por defecto levanta el puerto 50051 para que la cli "gobgp" se pueda comunicar.
Cambios de config con "kill -HUP"
O tambien mediante gRPC


Ejemplo de config simple:
[global.config]
  as = 64512
  router-id = "192.168.255.1"

[[neighbors]]
  [neighbors.config]
    neighbor-address = "10.0.255.1"
    peer-as = 65001

[[neighbors]]
  [neighbors.config]
    neighbor-address = "10.0.255.2"
    peer-as = 65002


# gobgp cli
https://github.com/osrg/gobgp/blob/master/docs/sources/cli-command-syntax.md

gobpg neighbor
  peers configurados, su estado (up/down) y rutas recibidas/aceptadas.
  Idle -> cargando conf?
  Active -> configurado pero no accesible
  Establ -> conexión establecida con el peer
  La columna up/down nos dirá si nunca ha visto al nodo, o cuanto tiempo lleva up (si está en Establ) o down (si está en Active)

gobgp neighbor add 1.2.3.4 as 999
  añadir la ip 1.2.3.4 como peer, cuyo AS es 999

gobpg neighbor 1.2.3.4
  más detalle sobre el peer con ip 1.2.3.4

gobgp global rib
  tabla de rutas
  cada network podrá tener varias entradas y el protocolo tendrá que decidir que ruta es mejor usar
  si se desconecta de un peer, borrará de la tabla de rutas sus entradas

gobgp global rib add -a ipv4 10.100.99.0/24
  exportamos esa ruta hacia los peers
  si miramos ahora la tabla de rutas, en el local veremos esa red con next hop a 0.0.0.0
  en los peers, esa red con next hop la ip del router donde hemos ejecutado este add
