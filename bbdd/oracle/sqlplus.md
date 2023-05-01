https://docs.oracle.com/cd/B25329_01/doc/appdev.102/b25108/xedev_sqlplus.htm

# Install
Arch
yay oracle-instantclient-sqlplus
  Necesitamos meter config en /etc/pacman.conf para bajarnos binarios compilados (temas de licencias de Oracle)


# Uso
sqlplus hr/my_hr_password@host_computer_name:1521/SID

Ejemplo en una centos 7:
ORACLE_HOME=/opt/oracle/product/21c/dbhomeXE /opt/oracle/product/21c/dbhomeXE/bin/sqlplus  "oracle_user/D4t4d0p3@localhost:1539/XE"

echo "select 1" | sqlplus '/as sysdba'
