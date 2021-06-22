Atena linux embedido + wifi + antena direccional.
Pensado para hacer enlaces punto a punto.

Para conectarnos al pharos debemos alimentarlo con POE (cable ethernet + DC).
Nos conectaremos al cable ethernet con un ordenador, configurando nuestra ip fija en la red 192.168.0.0/24, la del dispositivo es 192.168.0.254
Lo administramos através de su interfaz web.

Tiene varios métodos de funcionamiento.
Permite acceso ssh, aunque no encuentro las instrucciones para administrarlo.


## Modos de funcionamiento

# Cliente
Nos permite usarlo como una especie de tarjeta wifi.
Desde la interfaz web, seleccionamos el modo cliente y le decimos a que red debe conectarse.
Una vez conectado, cambiamos la configuración de nuestro interfaz ethernet a DHCP.
Nuestro pc estará conectado a la WIFI seleccionada y comenzará el intercambio de paquetes DHCP con el router originario de la wifi para darnos acceso.

