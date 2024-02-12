# Tailscale
VPN "moderna".
Es como muchos p2p interconnectados con un server central que maneja las claves y los ACLs para que se pueden conectar entre si

# Headscale
https://headscale.net/
Implementación opensource del "backend" de tailscale.

Se expone via :443

Obtiene el cert TLS via let's encrypt automáticamente.
Para esto necesitaremos el puerto 80.
