https://mosh.mit.edu/

Mosh is a replacement for SSH. It's more robust and responsive, especially over Wi-Fi, cellular, and long-distance links.
Parece que esta escrito en perl.

# Install
yum install -y mosh
pacman -S mosh

# Uso

En el servidor tendremos que tener abierto un puerto UDP (13000 en este caso)
Para conectar desde el cliente haremos:
mosh -p 13000 servidor

Por ssh estableceremos conexion y se arrancará en el server el mosh-server en el puerto 13000
Se cerrará la conex ssh y a partir de ese momento la conex se hará por 13000/UDP

Solo puede haber una conex al mismo tiempo (si no, necesitaremos varios puertos UDP abiertos)
