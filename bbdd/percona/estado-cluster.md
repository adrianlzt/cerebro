$ mysql -e "show status like 'wsrep_%'" 
algunos que mirar:
wsrep_cluster_size
wsrep_cluster_status
wsrep_connected
wsrep_ready


$ mysqladmin -u root -p variables

# netstat -ntlp
Galera: 4567
MySQL: 3306

