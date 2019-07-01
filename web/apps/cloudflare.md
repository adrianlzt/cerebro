cloudflare
Buena cdn

cloudfront de aws

https://www.peer5.com/cdn
cdn distribuido usando webrtc


# Como funciona
Hay dos tipos de CDN, por DNS y por anycast.
Lo que se busca es tener una baja latencia (bajo ping), a parte de otras ventajas (seguridad, protección ante DDoS, etc)

## DNS
Cuando resolvemos las DNS del servidor CDN, el servidor DNS de la CDN nos devolverá la ip más cercana según nuestra client ip.
Generalmente se utilizan resolvedores de la empresa que ofrece el acceso, y esa ip será la que vea el servidor CDN, asumiendo que tu ubicación estará en el mismo sitio que el resolvedor.

Para el caso de los DNS públicos (1.1.1.1, 8.8.8.8, etc) existe una extensión del protocolo DNS (http://www.afasterinternet.com/howitworks.htm) por la que el resolvedor enviará la red /24 de la ip del cliente hacia el servidor de DNS de la CDN. La CDN usará esa información para devolver el servidor más cercano.
Podemos simularlo con dig:
dig +subnet=161.202.17.0/24 @8.8.4.4 www.cnn.com
  aquí le estamos diciendo a las DNS de google que nuestra ip pública se encuentra en un AS de malasia

OpenDNS por ejemplo usa una whitelist para saber con quien usar esta extensión.

https://developers.google.com/speed/public-dns/docs/ecs
http://www.afasterinternet.com/ietfrfc.htm


## Anycast
Al resolver el servidor siempre se devuelve la misma IP.
Esa IP la publican muchos servidores desde distintas partes del mundo usando BGP.
El protocolo de enrutamiento decidirá a que destino llevarte que tenga el mínimo número de saltos.

Ejemplo: www.cloudflare.com resuelve 104.17.209.9 y 104.17.210.9, preguntes desde donde preguntes.
Si lanzamos ping a esas IPs desde España, USA a donde sea siempre tendremos baja latencia (< ~5ms), que sería imposible si realmente estuviesemos llegando al mismo server.
