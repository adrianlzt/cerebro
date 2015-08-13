export testNODE=puppet.service.dsn.inet; export testPORT=8140; (cat < /dev/tcp/$testNODE/$testPORT) & sleep 1;  ss -n | grep $testPORT ; kill %

Si se puede conectar la primera columa pondrá "ESTAB"
Si no puede conectar pondrá "SYN-SENT"


Más sencillo:
>/dev/tcp/localhost/22
  Si no devuelve nada esta abierto
  
  Si está cerrado:
  bash: connect: Conexión rehusada
  bash: /dev/tcp/localhost/23: Conexión rehusada


# Abrir puerto
nc -kl PUERTO

python -m SimpleHTTPServer PUERTO
