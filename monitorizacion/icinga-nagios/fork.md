Cada vez que se ejecuta un comando se hace un fork de icinga.
Si icinga tiene que hacer una notificacion, se crea un hijo de icinga que ejecute el comando para notificar.
Si ese comando lleva mucho tiempo, las notificaciones se encolan. Solo se crea un hijo para enviar notificaciones.
