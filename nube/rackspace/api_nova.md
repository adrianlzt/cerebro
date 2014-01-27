http://docs.rackspace.com/servers/api/v2/cs-gettingstarted/content/overview.html

### Endpoint ###
Mi cuenta está alojanda en londres, por lo que el endpoint a donde ataco será https://lon.* (en el manual por defecto está https://dfw.*)

Autentificarse:
London endpoint: https://lon.identity.api.rackspacecloud.com/v2.0

Podemos usar varios clientes:
apt-get install python-novaclient
pip install supernova (depende del anterior)
pip install rackspace-novaclient (supongo que dependerá del novaclient)

Para el nova cliet tendríamos que tener definidas las variables en el .bash_profile o similar
Con el supernova eso se gestiona desde ~/.supernova (dejo fichero de conf en este directorio)

Para el de rackspave-novaclient no se.


# Nova client:
nova --os-username usuario --os-password PASSWORD --os-tenant-name 1002 --os-auth-url https://lon.identity.api.rackspacecloud.com/v2.0/ --os-region-name LON list

Con variables de entorno:
OS_USERNAME=usuario OS_PASSWORD=passwd//3 OS_TENANT_NAME=1002 OS_AUTH_URL=https://lon.identity.api.rackspacecloud.com/v2.0/ OS_REGION_NAME=LON nova list


