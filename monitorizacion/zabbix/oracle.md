Notas sobre como montar un zabbix-server usando oracle como database.

# oracle

```bash
podman run -d -p 1521:1521 --name oracle-zabbix -e ORACLE_PASSWORD=password gvenzl/oracle-xe
```

```sql
CREATE USER zabbix IDENTIFIED BY "zabbix";
GRANT CREATE SESSION TO zabbix;
GRANT CREATE TABLE TO zabbix;
GRANT CREATE SEQUENCE TO zabbix;
GRANT CREATE TRIGGER TO zabbix;
GRANT CREATE PROCEDURE TO zabbix;
GRANT UNLIMITED TABLESPACE TO zabbix; -- Or grant quota on specific tablespaces
```

Copiar de la instalación de zabbix a este docker:
/mnt/zabbix-5.0.46/database/oracle/data.sql
/mnt/zabbix-5.0.46/database/oracle/double.sql
/mnt/zabbix-5.0.46/database/oracle/images.sql
/mnt/zabbix-5.0.46/database/oracle/schema.sql

Tuve que hacer un "sed s/2048/1048/" al schema.sql

Conectar a la db de zabbix
sqlplus zabbix/zabbix@localhost:1521/zabbix
@schema.sql
@data.sql

# zabbix

```bash
podman run -it --net host -v $PWD/zabbix:/mnt --name zabbix5-cetelm almalinux:8
bajar src https://www.zabbix.com/download_sources#50LTS
https://www.zabbix.com/documentation/5.0/en/manual/installation/install
dnf group install "Development Tools"
dnf install -y https://download.oracle.com/otn_software/linux/instantclient/2380000/oracle-instantclient-basic-23.8.0.25.04-1.el8.x86_64.rpm
dnf install -y https://download.oracle.com/otn_software/linux/instantclient/2380000/oracle-instantclient-devel-23.8.0.25.04-1.el8.x86_64.rpm
dnf install -y libevent-devel pcre-devel

[root@arco zabbix-5.0.46]# diff configure configure.orig
9843,9844c9843
<                 LIBS="$LIBS "
<                 #LIBS="$LIBS -lnnz$oracle_nnz1x_flag"
---
>                 LIBS="$LIBS -lnnz$oracle_nnz1x_flag"
>
./configure --enable-server --with-oracle=/usr/include/oracle/23
grep -lr -- -lnnz23 * | xargs sed -i "s/ -lnnz23//"

DBName=XE
DBUser=zabbix
DBPassword=zabbix
```
