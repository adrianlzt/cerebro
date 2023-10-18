https://github.com/postgresml/pgcat/
PostgreSQL pooler with sharding, load balancing and failover support.

Escrito en rust.

Permite balancear SELECT a las réplicas.

Permite solo balancear entre las réplicas.

# Config

Example file: https://github.com/postgresml/pgcat/blob/main/examples/docker/pgcat.toml

Parece que hay que especificar a mano el rol de cada server.
Esto no nos es útil si tenemos varios servidores que pueden variar (por ejemplo, un cluster con patroni).


# Docker
https://github.com/postgresml/pgcat/pkgs/container/pgcat
Parece que no se puede seleccionar por tag (versión), pero podemos usar el commit de ese tag.
docker pull ghcr.io/postgresml/pgcat:latest

La v1.1.1 es:
docker pull ghcr.io/postgresml/pgcat:1f2c6507f7fb5461df1a599c0b380aa114597bb5
