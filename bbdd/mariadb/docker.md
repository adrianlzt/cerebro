# Lenvatar server
docker run -e MYSQL_ROOT_PASSWORD=root -d mariadb:5.5.50

# Conectar
docker run -it --rm --link cranky_ardinghelli:mysql mariadb:5.5.50 sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'
