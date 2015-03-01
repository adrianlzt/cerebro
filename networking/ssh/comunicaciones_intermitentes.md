~/.ssh/config
Host *
  # Evitar el cierre de conexiones ssh
  # No enviar paquetes TCP para ver si la conex esta establecida (nos la cerrara si hay una pequeña desconexion)
  # Si la conexion desaparece, se reintenta 10 veces cada 120 segundos
  TCPKeepAlive no
  ServerAliveInterval 120
  ServerAliveCountMax 10


En el server
/etc/ssh/sshd_config
TCPKeepAlive no
ClientAliveInterval 120
ClientAliveCountMax 3

Si se pierde conex con el cliente intenta conectar 3 veces esperando 120s (creo)
