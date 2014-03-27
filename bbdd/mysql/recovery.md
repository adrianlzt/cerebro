http://dev.mysql.com/doc/refman/5.5/en/forcing-innodb-recovery.html

Si tenemos una InnoDB con problemas podemos usar el parámetro innodb_force_recovery para intentar entrar en la BD en solo lecutar y hacer un dump de los datos (o borrar tschemas incorrectos).

innodb_force_recovery puede tener valores de 1 a 6, cada cual más agresivo y peligroso.

Recomendado copiar los ficheros antes de empezar a tocar este parámetro.
