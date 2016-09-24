# eBPF / bcc / kprobes
Con la herramienta trace podemos meter una kprobe en la instruccion SSL_write o SSL_read para ver el trafico que se envia/recibe:
./trace -Z 200 'p:/usr/lib/libssl.so.1.0.0:SSL_write "%s", arg2'
./trace -Z 200 'p:/usr/lib/libssl.so.1.0.0:SSL_read "%s", arg2'
  el read solo me muestra el comienzo

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
