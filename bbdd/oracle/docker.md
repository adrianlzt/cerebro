Esto es una CDB

```bash
docker run -d -p 1521:1521 --name oracle -e ORACLE_PASSWORD=password gvenzl/oracle-xe
docker exec -it oracle bash
sqlplus sys/password@localhost:1521/XE as sysdba
```

Otra opción, esta standalone. OJO 11GiB de imagen.

```bash
docker run --name oracle -d -p 1521:1521 -e ORACLE_PWD=password doctorkirk/oracle-19c
# si no defino el ORACLE_SID
ORACLE_SID=ORCLCDB sqlplus / as sysdba
```
