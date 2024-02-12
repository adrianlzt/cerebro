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

Rutas que configura tailscale
ip route show table 52


## Enrutar subredes
Permitir forward
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf

Tenemos que pasar al "up" todo los parámetros que hayamos usado (si no lo hacemos, nos los mostrará para que los añadamos):
tailscale up --login-server=https://headscale.azure.iometrics.io --advertise-routes=10.1.0.0/24
Hace falta que la habiliten, mirar en Headscale.Routes

Los clientes linux tienen que haber configurado que permiten aceptar rutas.
sudo tailscale up --accept-routes

### 4to6 / IPv4 overlapped
https://tailscale.com/kb/1201/4via6-subnets


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

## Rutas
headscale routes list

Habilitar una ruta que alguien ha expuesto
headscale routes enable -r 1



## ACL
https://headscale.net/acls/

Si configuramos la opción de ACL, por defecto nada conectará con nada.
