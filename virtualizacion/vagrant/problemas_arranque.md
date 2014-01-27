Si una máquina la hemos dejado suspendida, y tenía la redirección del puerto 2200 para ssh a su 22.
Si arrancamos otra máquina con vagrant, y se pone a usar ese puerto, no nos dejará restaurar la primera máquina.

Podremos acceder desde la interfaz de virtualbox.
O a lo mejor cambiar el vagrantfile para redirigir otro puerto al 22 (esto no lo he probado)
