https://guacamole.incubator.apache.org/

Servidor que hace de proxy entre navegadores web y servidores conectados por VNC, RDP, SSH, etc

Guacamole expone una interfaz web a través de la cual podemos acceder a servidores que estén conectados a donde esté instalado guacamole.


# Install with docker
https://guacamole.incubator.apache.org/doc/gug/guacamole-docker.html

docker run --name guacd -d guacamole/guacd
docker run --name guacamole-postgres -e POSTGRES_PASSWORD=xxxx -d postgres
docker run --rm guacamole/guacamole /opt/guacamole/bin/initdb.sh --postgres > initdb.sql
docker exec -it guacamole-postgres createdb -U postgres guacamole_db
docker run -it --rm --link guacamole-postgres:postgres -v "$PWD:/dump" postgres psql -h postgres -U postgres -d guacamole_db -f /dump/initdb.sql
  nos pedira el password de admin
docker exec -it guacamole-postgres createuser -U postgres -DRSP guacamole_user
  nos pedira password para crear el usuario
docker exec -it guacamole-postgres psql -U postgres -c "GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA public TO guacamole_user;"
docker exec -it guacamole-postgres psql -U postgres -c "GRANT SELECT,USAGE ON ALL SEQUENCES IN SCHEMA public TO guacamole_user;"
  no me funciona bien lo de asignar permisos al guacamole_user. Algo falta en esas instrucciones.

docker run --name guacamole --link guacd:guacd --link guacamole-postgres:postgres -e "POSTGRES_DATABASE=guacamole_db" -e "POSTGRES_USER=guacamole_user" -e "POSTGRES_PASSWORD=somepass" -d -p 8080:8080 guacamole/guacamole


# Install debian/ubuntu
apt-get install guacamole guacamole-tomcat guacd

# Acceso
http://localhost:8080/guacamole/
User: guacadmin
Pass: guacadmin

Para sacar el menu
Control+Shift+Alt

Arrancar un x11vnc para tener vnc
