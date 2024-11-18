VPN "moderna".
Es como muchos p2p interconnectados con un server central que maneja las claves y los ACLs para que se pueden conectar entre si

# Cliente linux

Demonio tailscaled

Estado
tailscale status

si vemos que tenemos 'relay "code"', es que ese nodo va mediante DERP.
<https://tailscale.com/kb/1023/troubleshooting?q=troubles#how-do-i-know-if-my-traffic-is-being-routed-through-derp>

Registrarnos en un server
tailscale up --login-server <YOUR_HEADSCALE_URL>

Si queremos una interfaz web para la admin local
sudo tailscale web

Rutas que configura tailscale
ip route show table 52

Cambiar entre cuentas:
tailscale set --nickname foo
tailscale login --nickname=bar
tailscale switch foo
tailscale switch bar

Profiles definidos:
sudo cat /var/lib/tailscale/tailscaled.state | jq ._profiles -r | base64 -d | gron | grep "\.Name"

## Enrutar subredes

Permitir forward
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf

Tenemos que pasar al "up" todo los parámetros que hayamos usado (si no lo hacemos, nos los mostrará para que los añadamos):
tailscale up --login-server=<https://headscale.azure.iometrics.io> --advertise-routes=10.1.0.0/24
Hace falta que la habiliten, mirar en Headscale.Routes

Podemos advertir rutas dentro de otras rutas y así poder afinar en las ACLs.
Por ejemplo, podemos advertir 10.1.0.0/16 para que entren un grupo de usuarios y luego advertir 10.1.1.200/32 para que entre un usuario en concreto.

Los clientes linux tienen que haber configurado que permiten aceptar rutas.
sudo tailscale up --accept-routes

### 4to6 / IPv4 overlapped

<https://tailscale.com/kb/1201/4via6-subnets>

## Dos clientes simultáneos

<https://gist.github.com/dsnet/b0a602b15651e9502b9d8c5601053bb9>
Issue en tailscale: <https://github.com/tailscale/tailscale/issues/183>

El primer cliente será la instalación normal de tailscale.

El segundo expondrá únicamente un socket socks5.

# Headscale

<https://headscale.net/>
Implementación opensource del "backend" de tailscale.

Se expone via :443

Obtiene el cert TLS via let's encrypt automáticamente.
Para esto necesitaremos el puerto 80.

## OIDC

Podemos usar OIDC para registrar usuarios automáticamente.

## Usuarios

headscale users list

## Nodos

headscale nodes list

## Rutas

headscale routes list

Habilitar una ruta que alguien ha expuesto
headscale routes enable -r 1

## ACL

<https://headscale.net/acls/>

Si configuramos la opción de ACL, por defecto nada conectará con nada.

Central ACL policies are enforced by each Tailscale node’s incoming packet filter. If an ‘accept’ rule doesn’t exist, the traffic is rejected.

Parece que tailscaled cuando conecta al nodo central obtiene un listado de las reglas a aplicar.
Luego, por cada paquete se pasa por esos filtros para ver si aceptarlo o dropearlo: wgengine/filter/filter.go

NOTA: si estamos limitando subnets, deben coincidir con la subred anunciada por alguno de los nodos

## exit-node

<https://tailscale.com/kb/1103/exit-nodes>

Enrutar todo el tráfico hacia internet por un nodo de la tailnet.

Hace falta configurar sysctl y firewalld para que pueda enrutar tráfico.
El nodo también debe advertirse como exit-node
tailscale set --advertise-exit-node

Hace falta aceptarlo en la interfaz web.

A partir de ese momento otros nodos podrán verlo:
tailscale exit-node list

Para hacer que un nodo salga por un exit-node determinado:
tailscale set --exit-node=NOMBRE_NODO --exit-node-allow-lan-access
generalmente querremos poner el exit-node-allow-lan-access para poder seguir accediendo a nuestra LAN

Para desactivarlo:
tailscale set --exit-node=

# Serve

Exponer servicios locales al resto de la tailnet.
Monta un server https delante con un cert válido.

# Funnel

Exponer servicios locales a internet, estilo ngrok

tailscale funnel 8000
Levanta un server https redirigido a ese puerto.

tailscale funnel https+insecure://localhost:8443
Para enviar tráfico a un http inseguro local.

# SSH

Tailscale levanta un server ssh en la ip de tailscale.
Como dentro de la tailnet ya estamos autenticados, no hace falta el intercambio de claves típico de ssh, nos dejará acceder según la ACL que tengamos configurado.

Tenemos que permitirlo en las máquinas que queramos acceder via ssh
tailscale set --ssh

## Record session

<https://tailscale.com/kb/1246/tailscale-ssh-session-recording>

Enviar una grabación de las sesiones ssh a otro nodo de la tailnet.

tailscale ssh maquina
si el user es distinto tendremos que hacer user@maquina

# Logs

## Logs de aplicación

<https://github.com/tailscale/tailscale/blob/main/logtail/api.md>

Se envían a <https://log.tailscale.io/>
Son JSON comprimidos con zstd.

Son los logs que vemos en el journal.

## network flow logs

Logs de conexiones entre nodos. Metadatos, sin info de la conexión.

# Troubleshooting

<https://tailscale.com/kb/1023/troubleshooting#can-i-examine-network-traffic-inside-the-encrypted-tunnel>
Capturar tráfico dentro del tunel:
tailscale debug capture -o /path/to/capture.pcap

Tailscaled en modo debug
--debug=localhost:8080, to run a debug HTTP server serving paths such as /debug/pprof, /debug/metrics, /debug/ipn, /debug/magicsock, etc. The exact details of what’s accessible over the debug server is subject to change over time.

pprof métricas golang
metrics son en formato prometheus
ipn es como "tailscale status"
magicsock tiene bastante info interna sobre a donde estamos conectando, latencias, etc

Si queremos sacar el MapResponse (toda la info que le envía el server central al nodo), podemos configurar
TS_DEBUG_MAP=true

# Low level

Donde tailscaled guarda los perfiles y su información.
/var/lib/tailscale/tailscaled.state

Son base64 encoded.

El servidor 100.100.100.100 es el propio tailscaled local.

Cuando le realizamos peticiones las reenvia al servidor remoto DNS adecuado (se puede ver con sysdig).
