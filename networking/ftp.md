http://slacksite.com/other/ftp.html

# Active FTP
Tras la negociación (cliente:N -> server:21), el cliente envia el comando "PORT N+1", el servidor empieza una conexión contra el cliente:N+1
No se puede hacer si el cliente esta nateado

# Pasive FTP
Tras la negociación (cliente:N -> server:21), el cliente envia el comando "PASV", que solicita al sever otro puerto para la conexión de datos.
El cliente establece una segunda conexión contra otro puerto del servidor.
Este esquema funciona para clientes ftp detrás de NAT.
El server tiene que tener abierto el puerto 21 más un rango de puertos que serán los de datos.



lftp cliente ftp mejorado que tambien soporta fts, http, https, etc


Montar como disco:
curlftpfs ftp-user:ftp-pass@my-ftp-location.local /mnt/my_ftp/



# Servidor
vsftpd
por defecto el anon dir es /srv/ftp

En RH/CentOS -> /var/ftp

Por defecto esta activo. Para configurar como pasivo:
pasv_enable=YES
pasv_min_port=10090
pasv_max_port=10100
pasv_addr_resolve=YES
pasv_address=IP.PUBLICA.DEL.HOST
