En Azure podemos delegar zonas DNS púbilicas y privadas.

Las zonas privadas las tendremos que enlazar a las redes donde queremos que puedan resolver.
Lo haremos con "Virtual network links".

En los DNS por defecto que meten las subnets no podemos añadir registros manuales.
<https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-name-resolution-for-vms-and-role-instances?tabs=redhat#azure-provided-name-resolution:~:text=You%20can%27t%20manually%20register%20your%20own%20records>.
