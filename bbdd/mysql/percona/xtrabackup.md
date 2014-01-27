Herramienta para hacer backups sin bloqueo

--kill-long-queries-timeout=SECONDS¶
    This option specifies the number of seconds innobackupex waits between starting FLUSH TABLES WITH READ LOCK and killing those queries that block it. Default is 0 seconds, which means innobackupex will not attempt to kill any queries. In order to use this option xtrabackup user should have PROCESS and SUPER privileges.
