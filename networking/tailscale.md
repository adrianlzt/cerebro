# Tailscale
VPN "moderna".
Es como muchos p2p interconnectados con un server central que maneja las claves y los ACLs para que se pueden conectar entre si

# Cliente linux
Demonio tailscaled

Estado
tailscale status

Registrarnos en un server
tailscale up --login-server <YOUR_HEADSCALE_URL>

Si queremos una interfaz web para la admin local
sudo tailscale web



# Headscale
https://headscale.net/
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

## ACL
https://headscale.net/acls/

Si configuramos la opción de ACL, por defecto nada conectará con nada.
