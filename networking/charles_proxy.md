https://www.charlesproxy.com

Proxy para meter entre el pc y los endpoints.
Podemos ver el trafico que genera.

Parece que permite MitM para SSL.

Parece que es grauito durante 30 dias. Luego se deberia pagar, pero no nos obliga (creo)
Se para cada 30'

# Arch
yaourt -S charles


# Uso
Por defecto, al arrancar, los levanta un proxy HTTP en 127.0.0.1:8888


Para meter un proxy en chrome usar la extension:
Proxy SwitchyOmega


Si no, hay que arrancarlo con unas opciones especiales.


Para poder hacer MitM SSL.
Sacar el certificado raiz de Charles para instalarlo en chrome:
Help menu and choose "SSL Proxying > Save Charles Root Certificate"
Añadirlo como entidad emisora
