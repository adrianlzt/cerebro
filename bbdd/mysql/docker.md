https://hub.docker.com/_/mysql/

Arrancar server:
docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql

Conectar:
docker run -it --rm mysql mysql -h172.17.0.1 -proot

