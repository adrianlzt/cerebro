# Point to site

VPN para que un cliente final pueda conectar a Azure.
<https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal>

Creamos una red y una subred.
También hace falta crear una subred solo para donde estará el gateway
Creamos un "Virtual network gateways" asociado a la red/subred.
Configuramos el Point-to-Point
damos un rango de IPs par los clientes
un CA cert público (será quien firme los certificados clientes)
Download VPN client, nos baja un fichero .ovpn donde tenemos que meter el cert del cliente.

Configuración con terraform (falta parte certificados cliente).
<https://gist.github.com/adrianlzt/86033b29559965de0c32b6782d448991>

# Site to site / vpn peering / IPSec

<https://learn.microsoft.com/en-us/azure/vpn-gateway/tutorial-site-to-site-portal>

Conexión de dos VPNs

<https://blog.notnot.ninja/2020/09/19/azure-site-to-site-vpn/>

The Basic SKU is relatively affordable at ~$26.28 US/month, but it has a couple of limitations to be aware of:

- Bandwidth is limited at 100 Mbps
- Custom IPsec policies are not supported, as mentioned in this article.

The next SKU is about five times the price at ~$138.70 US/month. Also, keep in mind that you will be charged for the duration that the Virtual Network Gateway is provisioned even if you don’t have any active connections. Outbound data charges apply after 5GB /month.

Ejemplo de configuración de libreswan para hablar con esta VPN de azure: networking/ipsec_tunnel.md

## Packet capture

<https://learn.microsoft.com/en-us/azure/vpn-gateway/packet-capture#stop-packet-capture---portal>

Al parar la captura tenemos que enviarla a una "SAS URL". Esta se genera en un storage account, en un container (en los puntitos de la derecha), dándole permisos read-write.
