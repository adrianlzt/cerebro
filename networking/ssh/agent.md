Arrancar un "agente" ssh para poder ir pasando nuestra clave pública entre máquinas

1.- Meter la clave al agente
ssh-add clave.pem

2.- Arrancar ssh con el agente (-A)
ssh -A maquina

3.- Al saltar desde 'maquina' a 'otramaquina' se usará clave.pem
maquina$ ssh otramaquina
