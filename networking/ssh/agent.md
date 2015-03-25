Arrancar un "agente" ssh para poder ir pasando nuestra clave pública entre máquinas

1.- Meter la clave al agente
ssh-add clave.pem

2.- Arrancar ssh con el agente (-A)
ssh -A maquina

3.- Al saltar desde 'maquina' a 'otramaquina' se usará clave.pem
maquina$ ssh otramaquina


Tambien nos sirve para meter distintas claves en el agente de distintas ubicaciones, y luego siempre que usemos -A probará todas esas claves.



Podemos usar gnome keychain para cargarlas las claves automáticamente al inicio:
~/.bashrc
keychain --agents ssh ~/.ssh/tdaf.pem ~/.ssh/cyclops ~/.ssh/dsmctools.pem

