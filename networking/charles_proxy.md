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



# ICMP redirect
https://blog.zimperium.com/doubledirect-zimperium-discovers-full-duplex-icmp-redirect-attacks-in-the-wild/

Se trata de enviar un paquete ICMP especial a la victima indicandole una mejor ruta para una determinada ip.
De esta manera le podemos decir que para 8.8.8.8 vaya a nuestra ip, como si fuesemos un gateway de salida a internet.

La mayoría de linux y windows no aceptan este tipo de peticiones.
La mayoría de móviles si las aceptan.
