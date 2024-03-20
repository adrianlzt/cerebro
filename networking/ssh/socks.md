Abrir tunel socks:

ssh -D 1080 centos@maquinasalto
curl --socks4 127.0.0.1:1080 eth0.me
  deberiamos ver la maquina de salto


Conectar a un servidor destino usando un proxy socks (el proxy socks está en 127.0.0.1:1080)
ssh -o ProxyCommand="nc -x 127.0.0.1:1080 %h %p" server-destino


Conectar a un socks5 con auth (usando el netcat de nmap):
ssh -o ProxyCommand="ncat --proxy-auth usuario:password --proxy-type socks5 --proxy 127.0.0.1:9090 %h %p" server-destino
