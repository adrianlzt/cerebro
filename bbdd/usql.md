https://github.com/knq/usql

usql is a universal command-line interface for working with SQL databases.

$ go get -u github.com/knq/usql

$ usql pg://user:pass@localhost/dbname
$ usql my://user:pass@localhost/dbname
$ usql /var/run/mysqld/mysqld.sock
$ usql dbname.sqlite3

