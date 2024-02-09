# Point to site
VPN para que un cliente final pueda conectar a Azure.
https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal

Creamos una red y una subred.
  También hace falta crear una subred solo para donde estará el gateway
Creamos un "Virtual network gateways" asociado a la red/subred.
Configuramos el Point-to-Point
  damos un rango de IPs par los clientes
  un CA cert público (será quien firme los certificados clientes)
  Download VPN client, nos baja un fichero .ovpn donde tenemos que meter el cert del cliente.



# Site to site / vpn peering
https://learn.microsoft.com/en-us/azure/vpn-gateway/tutorial-site-to-site-portal

Conexión de dos VPNs
