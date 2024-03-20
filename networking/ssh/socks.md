Abrir tunel socks:

ssh -D 1080 centos@maquinasalto
curl --socks4 127.0.0.1:1080 eth0.me
  deberiamos ver la maquina de salto


Conectar a un servidor destino usando un proxy socks (el proxy socks está en 127.0.0.1:1080)
ssh -o ProxyCommand="nc -x 127.0.0.1:1080 %h %p" server-destino
