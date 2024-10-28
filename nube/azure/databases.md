# PostgreSQL

<https://azure.microsoft.com/en-us/products/postgresql/>
<https://azure.microsoft.com/en-us/pricing/details/postgresql/server/>
1vCPU 2 GiB €27.938/month

## Maintenance

Los servidores se van actualizando automáticamente. Lo realiza Azure.

Flexible Server provides a notification 5 days in advance of doing any maintenance.

Nos podemos subscribir a esas notificaciones.

Planned maintenance will lead to brief unavailability (60-120 seconds) of the database servers for end users.

In the case of high availability enabled servers, the planned maintenance will run on the standby server first. After it completes successfully, a failover will trigger to the standby database, so you'll see only a small blip (failover time).

# MySQL

<https://learn.microsoft.com/en-us/azure/mysql/flexible-server/overview>

Pricing
<https://azure.microsoft.com/en-us/pricing/details/mysql/>

Lo más barato:
Burstable
B1ms 1vCPU 2 GiB €12.490/month
Storage €0.120 GB/month

General Purpose Compute
D2ds v4 2vCPU 8 GiB €130.158/month

Por defecto tiene activado TLS mandatory.
Si queremos quitarlo o ver como gestionarlo
<https://learn.microsoft.com/en-us/azure/mysql/flexible-server/how-to-connect-tls-ssl>

## CLI

<https://learn.microsoft.com/en-us/azure/mysql/flexible-server/connect-azure-cli>

## Networking

<https://learn.microsoft.com/es-es/azure/mysql/flexible-server/concepts-networking#private-access-vnet-integration>

Tres opciones:

- acceso público (internet)
- interconexión con otras redes virtuales mediante "private link"
- virtual network, donde se verá con el resto de cosas pinchadas a esa red

# SQL Server

<https://azure.microsoft.com/en-us/pricing/details/azure-sql-database/single/>
<https://azure.microsoft.com/en-us/pricing/details/azure-sql-managed-instance/single/>

# Cosmos DB

<https://azure.microsoft.com/en-us/pricing/details/cosmos-db/autoscale-provisioned/>
Globally distributed, multi-model database service.
