https://docs.fortinet.com/uploaded/files/2537/AdminGuideV10.pdf

# Gestión de acceso
Generalmente usado mediante interfaz web.
También tiene conexion serie y ssh

En la consola:
> services ?


# Users
> show users

Crear user (nos preguntará la pass)
> user adrian
> user adrian flags admin


# SSH
Siempre acceder con eqadmin y luego ya poner el user/pass que usamos en la interfaz web

ssh eqadmin@blabla
User: XXX
Pass: XXX


# Maintenance mode
Si lo reiniciamos conectados a la consola serie, al arrancar nos da opciones para entrar en modo mantenimiento.
Tal vez en ese modo nos deje saltar al netbsd que hay por detrás.

# Debug mode
Si entramos por el puerto serie, cuando estamos con la pantalla que poner "username" damos a control+c

Si intentamos entrar a la shell, nos genera un codigo que tenemos que pasar al soporte de fortinet (http://kb.fortinet.com/kb/viewContent.do?externalId=FD34739) para que nos den la password de entrada

Si intentamos entrar con "login" y no podemos, parece que la cli se queda enganchada ahi y no nos deja volver al menu anterior (rebooteando podemos)
