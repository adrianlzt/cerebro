NFSv3

showmount --exports <ip-nfs>

El showmounts se conecta al puerto 111 (portmappeR) del servidor y le pregunta el puerto de "MOUNT".
   Si queremos obtener todos los puertos que conoce rpcinfo
     rpcinfo -p <server>
        -p usa portmapper (si no lo ponemos pueden salir otras cosas)
        Esto envía un DUMP al server.
El server le contesta con el puerto, que puede generarse dinámicamente.
El cliente pregunta los EXPORT al puerto de MOUNT.
El server contesta con los mount points permitidos para este cliente.

En un sistema montado, si hacemos un "file fichero", el cliente realiza una petición directamente al puerto 2049 del NFS.

El resto de los servicios podemos ver para que valen en servicios.md
