Wordpress + mariadb:
docker run --name some-mariadb -e MYSQL_ROOT_PASSWORD=root -d mariadb
docker run --name some-wordpress --link some-mariadb:mysql -p 8070:80 -d wordpress

http://localhost:8070
