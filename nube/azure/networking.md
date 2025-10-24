Las subredes dentro de una virtual network se ven entre si.

# Peering

Para interconectar vnets usar azure peering.
<https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview>
<https://learn.microsoft.com/en-us/azure/virtual-network/tutorial-connect-virtual-networks-portal>

# Rutas

No podemos setear rutas manuales en las máquinas, el tráfico no se enrutará.

Tendremos que crear una [Route table](https://portal.azure.com/#browse/Microsoft.Network%2FrouteTables) y asociarla a la subnet.
