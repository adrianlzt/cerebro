export testNODE=somehost.inet; export testPORT=8140; (cat < /dev/tcp/$testNODE/$testPORT) & sleep 1;  ss -n | grep $testPORT ; kill %

Si se puede conectar la primera columa pondrá "ESTAB"
Si no puede conectar pondrá "SYN-SENT"


Más sencillo:
>/dev/tcp/localhost/22
  Si no devuelve nada esta abierto

  Si está cerrado:
  bash: connect: Conexión rehusada
  bash: /dev/tcp/localhost/23: Conexión rehusada

> /dev/udp/IP/PUERTO
NO sirve para comprobar si un puerto está abierto


# Abrir puerto
nc -kl PUERTO

python -m SimpleHTTPServer PUERTO


# IP publica para ping
ping 1.1.1.1
ping 8.8.8.8

# IP publica para http
curl 1.1.1.1
curl 190.9.9.190
