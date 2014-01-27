# Como hacer comunicacion sin telnet ni netcat

cat < /dev/tcp/173.194.41.14/80

Para saber si hemos logrado establecer conexión:
netstat -tn | grep 173.194.41.14:80
tcp        0      0 192.168.1.33:52331      173.194.41.14:80        ESTABLECIDO

En el caso de no poder establecer conexión el estado quedará como:  SYN_SENT


cat data.dat > /dev/tcp/example.com/1234 
Receive: nc -l -p 1234 > data.dat

# Conecto el descriptor 3 a la conexion a www.google.com:80
# Envío el get, y leo la respuesta
exec 3<>/dev/tcp/www.google.com/80 
echo -e "GET / HTTP/1.1\n\n" >&3
cat <&3

/dev/udp/host/port 
