# sysbench
http://lwn.net/Articles/368908/

http://sysbench.sourceforge.net/docs/#database_mode

Example usage:

  $ sysbench --test=oltp --mysql-table-engine=myisam --oltp-table-size=1000000 --mysql-socket=/tmp/mysql.sock prepare
  $ sysbench --num-threads=16 --max-requests=100000 --test=oltp --oltp-table-size=1000000 --mysql-socket=/tmp/mysql.sock --oltp-read-only=on run

The first command will create a MyISAM table 'sbtest' in a database 'sbtest' on a MySQL server using /tmp/mysql.sock socket, then fill this table with 1M records. The second command will run the actual benchmark with 16 client threads, limiting the total number of request by 100,000.


sysbench --test=oltp --db-driver=mysql --oltp-table-size=1000000 --mysql-host=10.2.26.9 --mysql-user=user --mysql-password=pass --mysql-db=sbtest prepare
sysbench --db-driver=mysql --num-threads=16 --max-requests=100000 --test=oltp --oltp-table-size=1000000 --oltp-reconnect-mode=random --mysql-host=10.2.6.9 --mysql-user=user --mysql-password=pass --mysql-db=sbtest --max-time=60 run

sysbench --test=oltp --db-driver=mysql --oltp-table-size=1000000 --mysql-host=10.6.36.9 --mysql-user=user --mysql-password=pass --mysql-db=sbtest cleanup



