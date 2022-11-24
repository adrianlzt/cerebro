La idea es un proxy que te identifica con tu cuenta (google, openid, etc) y te deja acceder al servicio que quieres.
Es para poder acceder a servidores de la intranet de tu empresa sin tener que usar una VPN.
En google se identifica tanto el dispositivo que usas como el usuario.
También hacen "bigdata" de localización, hora, ip, session age, etc.
Con toda esa información se da al usuario un "nivel" de acceso.
También se envían info del dispositivo, versiones de software, actualizaciones, etc
Luego hay unas listas (ACL) que comparan ese nivel con el requerido para acceder a la aplicación que necesitas.

Problemas de una VPN:
  - no se puede desplegar en cualquier sitio
  - reutilización IPs
  - tener variar abiertas
  - dispositivos móviles
  - 2fa a veces no accesible (si lo usamos para la vpn, puedes tener internet en el pc pero no en el móvil)
  - latencias (obligamos a hacer más saltos)


# Implementación en Google Cloud
https://www.youtube.com/watch?v=Sq9gp8KBsY0
https://cloud.google.com/iap?authuser=1

Google Cloud Identity, necesario como fuente de usuarios.
  parece que hay que activar la version "premium" que cuesta 6$/usario*mes
  Diria que lo han cambiado y ya no es obligatorio

Activar IAP: https://console.cloud.google.com/apis/library/iap.googleapis.com
Admin: https://console.cloud.google.com/security/iap

https://cloud.google.com/beyondcorp-enterprise?authuser=1
  la versión premium nos permite que aplicaciones onprem también sean "defendidas" por IAP


## Access Context Manager
https://console.cloud.google.com/security/access-level

Aquí definiremos las reglas que permiten acceder:
  subnet
  región
  device policy


## HTTPs para servicios dentro de GCP
https://cloud.google.com/iap/docs/load-balancer-howto?authuser=1

Típicamente quitaremos las IPs públicas a las máquinas para forzar el acceso por tunel IAP.
Hace falta usar la cli gcloud


Instance group con las máquinas a las que apunta el proxy: https://console.cloud.google.com/compute/instanceGroups/list
  tipo: unmanaged

Crearemos un HTTPS load balancer: https://console.cloud.google.com/net-services/loadbalancing/add
  Apuntaremos al grupo de instancias que habremos creado antes
  Las VMs deben permitir acceso de los rangos de IPs de los probes de GCP (para comprobar el estado de los nodos)
    el "truco" parece ser tagear las máquinas con allow-health-check y crear una regla de FW de los rangos de las probes de google hacia esa tag
    https://cloud.google.com/load-balancing/docs/health-check-concepts#ip-ranges
  Al configurar el frontend elegiremos protocolo HTTPS (IAP solo protege endpoints https)
  Generalmente le querremos asociar una IP fija, que tendremos que haber solicitado anteriormente (https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address)
  Comprobar que accedemos correctamente mediante el balanceador

Hace falta activar la pantalla de consentimiento de OAuth: https://console.cloud.google.com/apis/credentials/consent

Este proxy aparecerá en la web de config de IAP
https://console.cloud.google.com/security/iap

Tras activar IAP en el load balancer, puede que lleve unos minutos hasta que salte la web de auth delante.

Pinchar sobre el https balancer y pulsar en añadir usuario, dando el permiso
  Cloud IAP > IAP-secured Web App User
  Se pueden dar de forma global a los usuarios con IAM: https://console.cloud.google.com/iam-admin/iam
  O de forma específica por recurso (LoadBalancer) en https://console.cloud.google.com/security/iap

Las peticiones a nuestro server llegarán desde las IPs de google, no de los clientes finales, aunque estarán en 'X-Forwarded-For'


## SSH / TCP
https://cloud.google.com/iap/docs/tcp-forwarding-overview?authuser=1
https://cloud.google.com/iap/docs/using-tcp-forwarding?authuser=1

Hace falta una regla firewall desde 35.235.240.0/20 hacia 22/TCP de las VMs a las que necesite acceder

Los usuarios tienen que tener los permisos:
  Cloud IAP > IAP-secured Tunnel User
  Se pueden dar de forma global a los usuarios con IAM: https://console.cloud.google.com/iam-admin/iam
  O de forma específica por recurso (VM) en https://console.cloud.google.com/security/iap

gcloud compute ssh INSTANCE_NAME
  usará la ip pública si existe, si no, tunel IAP

Si la instancia tiene IP pública, pero el acceso por el puerto 22 bloqueado, entraremos con:
gcloud compute ssh INSTANCE_NAME --tunnel-through-iap

Para crear un tunel TCP:
gcloud compute start-iap-tunnel INSTANCE_NAME INSTANCE_PORT




## OnPrem services
https://cloud.google.com/context-aware-access/docs/securing-on-premises

También podemos usar IAP para el acceso a recursos instalados fuera de gcp



# Open source
https://zero.pritunl.com/
https://github.com/ory/oathkeeper
https://github.com/vouch/vouch-proxy
  An SSO and OAuth / OIDC login solution for Nginx using the auth_request module

## Pomerium
pomerium.md
https://www.pomerium.com/

Versión OSS con funciones limitadas.

Lista de identity  providers que puede usar:
https://www.pomerium.com/docs/identity-providers/


Config reference:
https://www.pomerium.com/docs/reference

:443 main web
127.0.0.1:9901 envoy admin interface

### Insecure
Podemos usar la opción "insecure_server: true" para no usar TLS.
Por si tenemos el terminador TLS por encima.

## Rutas
Las rutas son donde mapeamos dominios públicos a dominios internos.
Pomerium se pone en medio haciendo el auth.

https://www.pomerium.com/reference/#routes
Ejemplos:
https://github.com/pomerium/pomerium/blob/6a69d39ca1dec5c724e520dc4cec8afddf2d83fb/examples/config/route.example.yaml

Config para las políticas:
https://www.pomerium.com/enterprise/reference/manage.html#pomerium-policy-language

Ejemplo que protege "https://jenkins.pomerium.foo.com"
Si el user está auth, podrá ver el contenido de http://172.17.0.1:8000

routes:
  - from: https://jenkins.pomerium.foo.com
    to: http://172.17.0.1:8000
    policy:
      - allow:
          or:
            - authenticated_user:


### Identity providers
#### Gitlab
Crear una app en gitlab.
El callback URL debe ser el mismo que el configurado en pomerium (authenticate_service_url) con /oauth2/callback
Ejemplo:
https://authenticate.pomerium.foo.com:5443/oauth2/callback

He tenido que usar la config:
idp_scopes: openid
Si ponia "idp_scopes: openid,profile,email" me daba error al hacer oauth sobre gitlab
Pero parece que de esta manera no tengo el email.
Podemos ver los datos disponibles con "session details" cuando no me deja entrar.
