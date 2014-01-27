Postgres tiene habilidades de public/subscribe integradas, ellos lo llaman Listen/Notify

http://www.postgresql.org/docs/9.3/static/sql-notify.html
http://www.postgresql.org/docs/9.3/static/sql-listen.html

The NOTIFY command sends a notification event together with an optional "payload" string to each client application that has previously executed LISTEN channel for the specified channel name in the current database.

NOTIFY provides a simple interprocess communication mechanism for a collection of processes accessing the same PostgreSQL database. A payload string can be sent along with the notification, and higher-level mechanisms for passing structured data can be built by using tables in the database to pass additional data from notifier to listener(s).
