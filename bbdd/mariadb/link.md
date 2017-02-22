https://docs.docker.com/engine/userguide/networking/default_network/dockerlinks/

# Conectar
docker run -it --rm --link cranky_ardinghelli:mysql mariadb:5.5.50 sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'

DEPRECATED!
Warning: The --link flag is a deprecated legacy feature of Docker. It may eventually be removed. Unless you absolutely need to continue using it, we recommend that you use user-defined networks to facilitate communication between two containers instead of using --link

