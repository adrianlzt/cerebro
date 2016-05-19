# Xtrabackup
https://gist.github.com/bengarrett/9cfac5e4d736fa92bf66
Permisos necesarios: https://www.percona.com/doc/percona-xtrabackup/2.2/innobackupex/privileges.html

mirar backup_ansible/

yum install percona-xtrabackup
mkdir -p /opt/mariadb_backup/{daily,weekly,monthly}
chown -R mysql:mysql /opt/mariadb_backup

mysql
CREATE USER 'mysql'@'localhost' IDENTIFIED BY '8h5rgfbgD3hda';
GRANT RELOAD, LOCK TABLES, REPLICATION CLIENT ON *.* TO 'mysql'@'localhost';
FLUSH PRIVILEGES;

vi /etc/cron.d/mariadb_backup
# Percona XtraBackup for database backup
# Backups de los ultimos 7 dias, las ultimas 4 semanas y los ultimos 12 meses
@daily mysql chronic innobackupex --user=mysql --password=8h5rgfbgD3hda --compress /opt/mariadb_backup/daily
@daily mysql chronic find /opt/mariadb_backup/daily -maxdepth 1 -type d -mtime +7 -exec rm -fr {} \;
@weekly mysql chronic innobackupex --user=mysql --password=8h5rgfbgD3hda --compress /opt/mariadb_backup/weekly
@weekly mysql chronic find /opt/mariadb_backup/weekly -maxdepth 1 -type d -mtime +30 -exec rm -fr {} \;
@monthly mysql chronic innobackupex --user=mysql --password=8h5rgfbgD3hda --compress /opt/mariadb_backup/monthly
@monthly mysql chronic find /opt/mariadb_backup/monthly -maxdepth 1 -type d -mtime +360 -exec rm -fr {} \;

Si quiero correr innobackupex con mas trazas de debug:
PTDEBUG=1 /usr/bin/innobackupex

chronic hace que solo tengamos stdout si el comando falla (es parte del paquete moreutils)




# Automysqlbackup
a daily, weekly and monthly backup for your MySQL database

https://sourceforge.net/projects/automysqlbackup/

RPM: http://rpm.pbone.net/index.php3/stat/4/idpl/30426062/dir/opensuse/com/automysqlbackup-v3.0_rc6-2.2.noarch.rpm.html

https://www.rosehosting.com/blog/how-to-install-and-configure-automysqlbackup/
