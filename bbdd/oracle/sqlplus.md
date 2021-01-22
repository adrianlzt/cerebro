https://docs.oracle.com/cd/B25329_01/doc/appdev.102/b25108/xedev_sqlplus.htm

# Install
Arch
yay oracle-instantclient-sqlplus
  Necesitamos meter config en /etc/pacman.conf para bajarnos binarios compilados (temas de licencias de Oracle)


# Uso
sqlplus hr/my_hr_password@host_computer_name:1521/SID

echo "select 1" | sqlplus '/as sysdba'
