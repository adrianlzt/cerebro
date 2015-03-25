http://docs.mongodb.org/manual/administration/monitoring/

Por defecto mongo solo rota si le damos la orden:

use admin
db.runCommand( { logRotate : 1 } )

O tambien:
kill -SIGUSR1 <mongod process id>


Para usar logrotate:
http://blog.viktorpetersson.com/post/92729953474/mongodb-and-logrotate
Aqui no dice nada de usar la opcion --logrotate en mongo. (es version 3)


MEJOR:
Usar un rotado normal, como si mongo no supiese nada de rotado

/var/log/mongo/mongod.log {
    daily
    copytruncate
    compress
    rotate 30
    ifempty
    missingok
}


