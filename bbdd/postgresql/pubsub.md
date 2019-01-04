https://www.postgresql.org/docs/9.6/static/sql-notify.html
https://www.postgresql.org/docs/9.6/static/sql-listen.html
https://news.ycombinator.com/item?id=12649712
https://tapoueh.org/blog/2018/07/postgresql-listen/notify/

The NOTIFY command sends a notification event together with an optional "payload" string to each client application that has previously executed LISTEN channel for the specified channel name in the current database.

NOTIFY provides a simple interprocess communication mechanism for a collection of processes accessing the same PostgreSQL database. A payload string can be sent along with the notification, and higher-level mechanisms for passing structured data can be built by using tables in the database to pass additional data from notifier to listener(s).

Solo se enviarán notificaciones al los clientes conectados. Si no hay nadie conectando en ese momento, se perderá la notificación.
Si necesitamos no perder eventos, mirar queue_jobs.md


Ejemplo de código SQL para registrar una notificación en postgres para enviar notificaciones ante un cambio
https://gist.github.com/bithavoc/f40bbc33b553f2fddf9e1095858acdff


-- LISTEN/NOTIFY has a payload size hardcoded maximum. For big documents, we have to send a record ID then fetch the document upon receiving a message. In practice, it adds 5ms of overhead.


Ejemplo con python y websockets: http://initd.org/psycopg/articles/2010/12/01/postgresql-notifications-psycopg2-eventlet/

Otro que hace algo parecido: https://bitbucket.org/btubbs/todopy-pg

Otro ejemplo: https://almightycouch.org/blog/realtime-changefeeds-postgresql-notify/

Con psql, subscribirnos a los cambios de una tabla y enviar dichos cambios via socket tcp: https://gonzalo123.com/2012/11/26/sending-sockets-from-postgresql-triggers-with-python/




# Dudas
Conectar los clientes directamente contra postgres? Usar postrgres como frontend
No parece una buena idea.
