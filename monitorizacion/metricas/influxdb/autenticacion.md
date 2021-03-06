https://docs.influxdata.com/influxdb/v0.10/administration/authentication_and_authorization/

Note: Authentication and authorization should not be relied upon to prevent access and protect data from malicious actors. If additional security or compliance features are desired, InfluxDB should be run behind a third-party service.

La auth solo afecta al endpoint http. Es HTTP Basic Authentication

/etc/influxdb/influxdb.conf
[http]
auth-enabled = true

service influxdb restart

Una vez reiniciado, solo aceptará peticiones autenticadas.
Si no había ningún usuario, solo aceptara la query para generar un usuario admin.
curl http://localhost:8086/query --data-urlencode "q=CREATE USER \"admin\" WITH PASSWORD 'admin' WITH ALL PRIVILEGES"

La auth se puede realizar con cabecera o por parámetros (esta última tiene prioridad):
curl -G http://localhost:8086/query -u todd:influxdb4ever --data-urlencode "q=SHOW DATABASES"
curl -G http://localhost:8086/query --data-urlencode "u=todd" --data-urlencode "p=influxdb4ever" --data-urlencode "q=SHOW DATABASES"

# Secuencia de crear database, usuario y dar permisos
curl http://localhost:8086/query -u admin:admin --data-urlencode "q=CREATE USER \"homeassistant\"  WITH PASSWORD 'homeassistant'"
curl http://localhost:8086/query -u admin:admin --data-urlencode "q=create database homeassistant"
curl http://localhost:8086/query -u admin:admin --data-urlencode "q=GRANT ALL ON \"homeassistant\" TO \"homeassistant\""



Para la cli
$ influx
> auth user pass

$ influx -username user -password pass

INFLUX_USERNAME=admin INFLUX_PASSWORD=admin influx -execute "show databases"


# Administración de usuarios
# Crear
CREATE USER "<username>" WITH PASSWORD '<password>' WITH ALL PRIVILEGES
  crea un user admin

CREATE USER "<username>" WITH PASSWORD '<password>'
  crea un user normal

# Listar
SHOW USERS

SHOW GRANTS FOR <user_name>

# Modificar
GRANT ALL PRIVILEGES TO <username>
  convertir un usuario en admin

REVOKE ALL PRIVILEGES FROM <username>
  quitar permisos de admin a un user

GRANT ALL ON "db" TO "user"
GRANT [READ,WRITE,ALL] ON "<database_name>" TO "<username>"

REVOKE [READ,WRITE,ALL] ON <database_name> FROM <username>

SET PASSWORD FOR <username> = '<password>'

# Borrar
DROP USER <username>
